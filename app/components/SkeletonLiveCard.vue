<script setup lang="ts">
withDefaults(defineProps<{ count?: number }>(), { count: 6 })
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    <div v-for="i in count" :key="i" class="card p-4 space-y-4">
      <div class="flex justify-between">
        <div class="skeleton h-4 w-28 rounded" />
        <div class="skeleton h-5 w-12 rounded-full" />
      </div>
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div class="flex flex-col items-center gap-2">
          <div class="skeleton w-12 h-12 rounded-full" />
          <div class="skeleton h-3 w-10 rounded" />
        </div>
        <div class="skeleton h-8 w-16 rounded" />
        <div class="flex flex-col items-center gap-2">
          <div class="skeleton w-12 h-12 rounded-full" />
          <div class="skeleton h-3 w-10 rounded" />
        </div>
      </div>
      <div class="skeleton h-9 w-full rounded-xl" />
    </div>
  </div>
</template>
