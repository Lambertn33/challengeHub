<script setup lang="ts">
import { useChallengeProgress } from '@/composables'
import ProgressBar from '@/components/ProgressBar.vue'

const { completedDaysCount, totalDays } = useChallengeProgress()
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

      <section class="mb-6">
        next action banner
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
  </div>
</template>