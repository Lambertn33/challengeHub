<script setup lang="ts">
import type { ChallengeDay } from '@/types'

defineProps<{
  currentDay: ChallengeDay | null
}>()
</script>

<template>
  <div
    v-if="currentDay"
    class="rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50 p-4"
  >
    <p class="text-sm font-medium text-emerald-800 dark:text-emerald-200">
      Next: Day {{ currentDay.dayNumber }} – {{ currentDay.title }}
    </p>
    <p class="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
      Complete the tasks below to unlock the next day.
    </p>
  </div>
</template>