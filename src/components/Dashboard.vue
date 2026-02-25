<script setup lang="ts">
import { useChallengeProgress, useExchangeConnection, useTracking } from '@/composables'
import ProgressBar from '@/components/ProgressBar.vue'
import NextActionBanner from '@/components/NextActionBanner.vue'
import DayCard from '@/components/DayCard.vue'


const { completedDaysCount, totalDays, currentDay, isChallengeComplete, days, toggleTask, setExchangeTaskComplete } = useChallengeProgress()
const { track } = useTracking()
const exchange = useExchangeConnection({ track });
const exchangeState = exchange.state;
const DAY_1_ID = "day-1";

async function handleCheckExchange() {
  const ok = await exchange.checkConnection();
  if (ok) setExchangeTaskComplete(DAY_1_ID);
}

async function handleRetryExchange() {
  const ok = await exchange.retry();
  if (ok) setExchangeTaskComplete(DAY_1_ID);
}

function handleToggleTask(dayId: string, taskId: string, completed: boolean) {
  toggleTask(dayId, taskId, completed);
  track("task_toggled", { dayId, taskId, completed });
}

function handleDayOpened(dayId: string) {
  track("day_opened", { dayId });
}
</script>

<template>
  <div
    class="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden"
  >
    <div class="shrink-0 mx-auto w-full max-w-2xl px-4 pt-8 pb-4">
      <header class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          ChallengeHub
        </h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Complete each day to unlock the next.
        </p>
      </header>

      <section class="mb-6">
        <ProgressBar :completed-count="completedDaysCount" :total="totalDays" />
      </section>

      <section class="mb-6" v-if="currentDay && !isChallengeComplete">
        <NextActionBanner :current-day="currentDay" />
      </section>

      <section
       
        class="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50 p-6 text-center"
      >
        <p class="text-lg font-medium text-emerald-800 dark:text-emerald-200">
          Challenge complete
        </p>
        <p class="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
          You've finished all 5 days. Great work!
        </p>
      </section>
    </div>
    
    <!---Day Cards loop-->
    <div class="flex-1 min-h-0 overflow-y-auto">
      <ul class="mx-auto max-w-2xl px-4 pb-8 space-y-4">
        <li v-for="day in days" :key="day.id">
          <DayCard
            :day="day"
            :exchange-state="day.id === DAY_1_ID ? exchangeState : undefined"
            :exchange-circuit-open="
              day.id === DAY_1_ID ? exchange.isCircuitOpen.value : false
            "
            :exchange-cooldown-remaining="
              day.id === DAY_1_ID ? exchange.cooldownRemaining.value : 0
            "
            :exchange-is-retrying="
              day.id === DAY_1_ID ? exchange.isRetrying.value : false
            "
            :on-toggle-task="handleToggleTask"
            :on-check-exchange="
              day.id === DAY_1_ID ? handleCheckExchange : undefined
            "
            :on-retry-exchange="
              day.id === DAY_1_ID ? handleRetryExchange : undefined
            "
            @opened="handleDayOpened"
          />
        </li>
      </ul>
    </div>
  </div>
</template>