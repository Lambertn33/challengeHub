<script setup lang="ts">
  defineProps<{
    completedCount: number
    total: number
  }>()
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
      <span>Progress</span>
      <span>{{ completedCount }} / {{ total }} days complete</span>
    </div>
    <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
      <div
        class="h-full rounded-full bg-emerald-500 transition-all duration-300"
        :style="{ width: total ? `${(completedCount / total) * 100}%` : '0%' }"
      />
    </div>
  </div>
</template>