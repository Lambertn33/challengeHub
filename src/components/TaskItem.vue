<script setup lang="ts">
import type { Task, ExchangeConnectionState } from '@/types'
import ExchangeTaskSkeleton from './ExchangeTaskSkeleton.vue'

const props = withDefaults(
  defineProps<{
    task: Task
    dayId: string
    isLocked: boolean
    exchangeState?: ExchangeConnectionState
    exchangeCircuitOpen?: boolean
    exchangeCooldownRemaining?: number
    exchangeIsRetrying?: boolean
    onCheckExchange?: () => Promise<void>
    onRetryExchange?: () => Promise<void>
  }>(),
  {
    exchangeState: undefined,
    exchangeCircuitOpen: false,
    exchangeCooldownRemaining: 0,
    exchangeIsRetrying: false,
    onCheckExchange: undefined,
    onRetryExchange: undefined,
  }
)

const emit = defineEmits<{
  toggle: [completed: boolean]
}>()

const isExchangeTask = () => props.task.type === 'exchange'

function handleToggle(completed: boolean) {
  if (isExchangeTask()) return
  emit('toggle', completed)
}
</script>

<template>
  <li
    class="flex items-start gap-3 py-2"
    :class="{ 'opacity-60': isLocked && !task.completed }"
  >
    <!-- Normal task: checkbox -->
    <template v-if="task.type === 'normal'">
      <input
        type="checkbox"
        :id="`${dayId}-${task.id}`"
        :checked="task.completed"
        :disabled="isLocked"
        class="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        @change="handleToggle(($event.target as HTMLInputElement).checked)"
      />
      <label :for="`${dayId}-${task.id}`" class="flex-1 text-sm">
        <span :class="{ 'line-through text-gray-500': task.completed }">{{ task.label }}</span>
      </label>
    </template>

    <!-- Exchange task: connect button + states -->
    <template v-else>
      <input
        type="checkbox"
        :checked="task.completed"
        disabled
        class="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600"
        aria-hidden="true"
      />
      <div class="flex-1 min-w-0">
        <span class="text-sm" :class="{ 'line-through text-gray-500': task.completed }">
          {{ task.label }}
        </span>
        <div v-if="!task.completed && !isLocked" class="mt-2 space-y-2">
          <button
            v-if="(!exchangeState || exchangeState.status === 'idle') && !exchangeCircuitOpen && !exchangeIsRetrying"
            type="button"
            class="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            @click="onCheckExchange?.()"
          >
            Check connection
          </button>
          <ExchangeTaskSkeleton
            v-else-if="exchangeState?.status === 'loading' || exchangeIsRetrying"
          />
          <div
            v-else-if="exchangeState?.status === 'success'"
            class="text-sm text-emerald-600 dark:text-emerald-400"
          >
            Connected{{ exchangeState.data.exchangeName ? ` (${exchangeState.data.exchangeName})` : '' }}
          </div>
          <div
            v-else-if="exchangeState?.status === 'error'"
            class="rounded-md bg-red-50 dark:bg-red-950/30 p-2 text-sm text-red-700 dark:text-red-300"
          >
            <p v-if="exchangeCircuitOpen" class="font-medium">
              Too many failures. Please try again in {{ exchangeCooldownRemaining }}s.
            </p>
            <p v-else>{{ exchangeState.message }}</p>
            <button
              v-if="!exchangeCircuitOpen"
              type="button"
              class="mt-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              :disabled="exchangeIsRetrying"
              @click="onRetryExchange?.()"
            >
              {{ exchangeIsRetrying ? 'Retrying…' : 'Try again' }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </li>
</template>
