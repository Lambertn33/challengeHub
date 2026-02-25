<script setup lang="ts">

</script>

<template>
  <template>
  <article
    class="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 overflow-hidden"
  >
    <button
      type="button"
      class="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      
    >
      <div class="flex items-center gap-3">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
        >
          <template >✓</template>
          <template >Day Number</template>
        </span>
        <span class="font-medium text-gray-900 dark:text-white">Day Number: Day Title</span>
      </div>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-medium"
      >
        Status Label
      </span>
    </button>
    <div
      class="border-t border-gray-100 dark:border-gray-800 px-4 py-3"
    >
      <p
        class="mb-2 text-xs text-gray-500 dark:text-gray-400"
      >
        Complete Previous Day to unlock these tasks.
      </p>
      <ul class="space-y-0">
        Task Items loop
      </ul>
    </div>
  </article>
</template>
</template>