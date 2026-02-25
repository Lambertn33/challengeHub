<script setup lang="ts">
import type { ChallengeDay } from '@/types'
import { DAY_STATUS } from '@/constants'

import TaskItem from './TaskItem.vue'


defineProps<{
  day: ChallengeDay
  exchangeState?: import('@/types').ExchangeConnectionState
  exchangeCircuitOpen?: boolean
  exchangeCooldownRemaining?: number
  exchangeIsRetrying?: boolean
  onToggleTask?: (dayId: string, taskId: string, completed: boolean) => void
  onCheckExchange?: () => Promise<void>
  onRetryExchange?: () => Promise<void>
}>()

const emit = defineEmits<{
  opened: [dayId: string]
}>()

const isLocked = (day: ChallengeDay) => day.status === DAY_STATUS.LOCKED
const statusLabel = (day: ChallengeDay) =>
  day.status === DAY_STATUS.LOCKED ? 'Locked' : day.status === DAY_STATUS.IN_PROGRESS ? 'In progress' : 'Completed'

function handleOpened(dayId: string) {
  emit('opened', dayId)
}
</script>

<template>
  <article
    :id="day.id"
    class="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 overflow-hidden"
    :class="{
      'border-gray-200': day.status !== DAY_STATUS.LOCKED,
      'border-gray-100 dark:border-gray-800 opacity-90': day.status === DAY_STATUS.LOCKED,
    }"
  >
    <button
      type="button"
      class="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      :disabled="day.status === DAY_STATUS.LOCKED"
      @click="day.status !== DAY_STATUS.LOCKED && handleOpened(day.id)"
    >
      <div class="flex items-center gap-3">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
          :class="{
            'bg-gray-200 dark:bg-gray-700 text-gray-500': day.status === DAY_STATUS.LOCKED,
            'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300':
              day.status === DAY_STATUS.IN_PROGRESS,
            'bg-emerald-600 text-white': day.status === DAY_STATUS.COMPLETED,
          }"
        >
          <template v-if="day.status === DAY_STATUS.COMPLETED">✓</template>
          <template v-else>{{ day.dayNumber }}</template>
        </span>
        <span class="font-medium text-gray-900 dark:text-white text-sm font-semibold">Day {{ day.dayNumber }}: {{ day.title }}</span>
      </div>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-medium"
        :class="{
          'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400': day.status === DAY_STATUS.LOCKED,
          'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200': day.status === DAY_STATUS.IN_PROGRESS,
          'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200': day.status === DAY_STATUS.COMPLETED,
        }"
      >
        {{ statusLabel(day) }}
      </span>
    </button>
    <div
      class="border-t border-gray-100 dark:border-gray-800 px-4 py-3"
      :class="{ 'bg-gray-50/50 dark:bg-gray-800/30': day.status === DAY_STATUS.LOCKED }"
    >
      <p
        v-if="day.status === DAY_STATUS.LOCKED"
        class="mb-2 text-xs text-gray-500 dark:text-gray-400"
      >
        Complete Day {{ day.dayNumber - 1 }} to unlock these tasks.
      </p>
      <ul class="space-y-0">
        <TaskItem v-for="task in day.tasks" :key="task.id" />
      </ul>
    </div>
  </article>
</template>
