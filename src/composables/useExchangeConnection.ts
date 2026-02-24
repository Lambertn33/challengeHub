import { ref, computed, watch, onScopeDispose, type Ref } from 'vue'
import type { ExchangeConnectionState } from '@/types'
import { checkExchangeConnection } from '@/api'
import { EXCHANGE_CONNECTION_STATES, EXCHANGE_API_ERROR_TYPES } from '@/constants'

const CIRCUIT_OPEN_THRESHOLD = 3
const COOLDOWN_MS = 30_000
const BACKOFF_BASE_MS = 1_000
const BACKOFF_MAX_MS = 5_000

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  
export type ExchangeTracking = (eventName: string, payload?: Record<string, unknown>) => void

export function useExchangeConnection(options?: { track?: ExchangeTracking }) {
    const track = options?.track
    const state: Ref<ExchangeConnectionState> = ref({ status: EXCHANGE_CONNECTION_STATES.IDLE })
    const consecutiveFailures = ref(0)
    const cooldownUntil = ref<number | null>(null)
    const isRetrying = ref(false)
    const nowRef = ref(Date.now())
  
    const intervalId = setInterval(() => {
      nowRef.value = Date.now()
    }, 1_000)
    onScopeDispose(() => clearInterval(intervalId))
  
    const cooldownRemaining = computed(() => {
      const until = cooldownUntil.value
      if (!until) return 0
      return Math.max(0, Math.ceil((until - nowRef.value) / 1_000))
    })
  
    const isCircuitOpen = computed(() => cooldownRemaining.value > 0)
  
    watch(cooldownRemaining, (newVal, oldVal) => {
      if (newVal === 0 && oldVal > 0 && cooldownUntil.value !== null) {
        cooldownUntil.value = null
        consecutiveFailures.value = 0
      }
    })
  
    const isIdle = () => state.value.status === EXCHANGE_CONNECTION_STATES.IDLE
    const isLoading = () => state.value.status === EXCHANGE_CONNECTION_STATES.LOADING
    const isSuccess = () => state.value.status === EXCHANGE_CONNECTION_STATES.SUCCESS
    const isError = () => state.value.status === EXCHANGE_CONNECTION_STATES.ERROR
  
    async function checkConnection(): Promise<boolean> {
      const timestamp = Date.now()
      track?.('exchange_connection_attempted', { timestamp })
      state.value = { status: EXCHANGE_CONNECTION_STATES.LOADING }
  
      try {
        const response = await checkExchangeConnection()
  
        if (response.ok) {
          state.value = {
            status: EXCHANGE_CONNECTION_STATES.SUCCESS,
            data: response.data,
          }
          consecutiveFailures.value = 0
          cooldownUntil.value = null
          track?.('exchange_connection_succeeded', {
            timestamp: Date.now(),
            responseTime: response.responseTimeMs,
          })
          return true
        }
  
        state.value = {
          status: EXCHANGE_CONNECTION_STATES.ERROR,
          errorType: response.errorType,
          message: response.message,
        }
        consecutiveFailures.value++
        const willRetry = consecutiveFailures.value < CIRCUIT_OPEN_THRESHOLD
        if (consecutiveFailures.value >= CIRCUIT_OPEN_THRESHOLD) {
          cooldownUntil.value = Date.now() + COOLDOWN_MS
        }
        track?.('exchange_connection_failed', {
          timestamp: Date.now(),
          errorType: response.errorType,
          willRetry,
        })
        return false
      } catch (err) {
        state.value = {
          status: EXCHANGE_CONNECTION_STATES.ERROR,
          errorType: EXCHANGE_API_ERROR_TYPES.NETWORK_ERROR,
          message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        }
        consecutiveFailures.value++
        const willRetry = consecutiveFailures.value < CIRCUIT_OPEN_THRESHOLD
        if (consecutiveFailures.value >= CIRCUIT_OPEN_THRESHOLD) {
          cooldownUntil.value = Date.now() + COOLDOWN_MS
        }
        track?.('exchange_connection_failed', {
          timestamp: Date.now(),
          errorType: EXCHANGE_API_ERROR_TYPES.NETWORK_ERROR,
          willRetry,
        })
        return false
      }
    }
  
    function reset(): void {
      state.value = { status: EXCHANGE_CONNECTION_STATES.IDLE }
      consecutiveFailures.value = 0
      cooldownUntil.value = null
    }
  
    async function retry(): Promise<boolean> {
      if (isCircuitOpen.value) return false
  
      isRetrying.value = true
      try {
        const backoffMs = Math.min(
          consecutiveFailures.value * BACKOFF_BASE_MS,
          BACKOFF_MAX_MS
        )
        await delay(backoffMs)
        return await checkConnection()
      } finally {
        isRetrying.value = false
      }
    }
  
    return {
      state,
      isIdle,
      isLoading,
      isSuccess,
      isError,
      checkConnection,
      reset,
      retry,
      isCircuitOpen,
      cooldownRemaining,
      isRetrying,
    }
  }