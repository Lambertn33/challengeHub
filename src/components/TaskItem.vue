<script setup lang="ts">

</script>

<template>
  <li
    class="flex items-start gap-3 py-2"
  >
    <!-- Normal task: checkbox -->
    <template>
      <input
        type="checkbox"
        :checked="false"
        class="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        @change="() => {}"
      />
      <label class="flex-1 text-sm">
        <span >Task Label</span>
      </label>
    </template>

    <!-- Exchange task: connect button + states -->
    <template>
      <input
        type="checkbox"
        checked="false"
        class="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600"
        aria-hidden="true"
      />
      <div class="flex-1 min-w-0">
        <span class="text-sm">
          Task Label
        </span>
        <div  class="mt-2 space-y-2">
          <button
            type="button"
            class="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            @click="() => {}"
          >
            Check connection
          </button>
          <div
            class="text-sm text-emerald-600 dark:text-emerald-400"
          >
            Connected
          </div>
          <div
            class="rounded-md bg-red-50 dark:bg-red-950/30 p-2 text-sm text-red-700 dark:text-red-300"
          >
            <p class="font-medium">
              Too many failures. Please try again in
            </p>
            <button
              type="button"
              class="mt-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              @click="() => {}"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </template>
  </li>
</template>
