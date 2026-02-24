import { EXCHANGE_API_ERROR_TYPES } from '@/constants'
import type { ExchangeApiResponse } from '@/types'

const FAILURE_CHANCE = 0.3
const TIMEOUT_MS = 3000
const MIN_LATENCY_MS = 200
const MAX_LATENCY_MS = 800

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

//Simulates a timeout by resolving after TIMEOUT_MS
function timeoutResponse(): Promise<ExchangeApiResponse> {
    return delay(TIMEOUT_MS).then(() => ({
      ok: false as const,
      errorType: EXCHANGE_API_ERROR_TYPES.TIMEOUT,
      message: 'Request timed out. Please try again.',
    }))
}

//Simulates a connection check to an exchange API
//Fails ~30% of the time (timeout or server/network error)
export function checkExchangeConnection(): Promise<ExchangeApiResponse> {
    const latency = randomBetween(MIN_LATENCY_MS, MAX_LATENCY_MS)
    const shouldFail = Math.random() < FAILURE_CHANCE
  
    const successResponse = (): Promise<ExchangeApiResponse> =>
      delay(latency).then(() => ({
        ok: true as const,
        data: {
          connected: true,
          exchangeName: 'Mock Exchange',
          userId: 'user-' + Date.now(),
        },
        responseTimeMs: latency,
      }))
  
    const errorResponse = (): Promise<ExchangeApiResponse> => {
      const roll = Math.random()
      if (roll < 0.5) {
        // Simulate timeout: take longer than TIMEOUT_MS
        return delay(TIMEOUT_MS + 500).then(() => ({
          ok: false as const,
          errorType: EXCHANGE_API_ERROR_TYPES.TIMEOUT,
          message: 'Request timed out. Please try again.',
        }))
      }
      if (roll < 0.8) {
        return delay(latency).then(() => ({
          ok: false as const,
          errorType: EXCHANGE_API_ERROR_TYPES.SERVER_ERROR,
          message: 'Exchange service is temporarily unavailable.',
        }))
      }
      return delay(latency).then(() => ({
        ok: false as const,
        errorType: EXCHANGE_API_ERROR_TYPES.NETWORK_ERROR,
        message: 'Network error. Check your connection and try again.',
      }))
    }
  
    const request = shouldFail ? errorResponse() : successResponse()
  
    // if request takes longer than TIMEOUT_MS, return timeout error
    return Promise.race([
      request,
      timeoutResponse(),
    ])
  }