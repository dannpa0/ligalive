<script setup lang="ts">
withDefaults(defineProps<{ count?: number }>(), { count: 3 })
</script>

<template>
  <div class="card divide-y divide-line">
    <div v-for="i in count" :key="i" class="flex items-center gap-3 px-4 py-3.5">
      <div class="skeleton w-8 h-4 rounded" />
      <div class="w-px self-stretch bg-line" />
      <div class="flex-1 space-y-2">
        <div class="flex items-center gap-2.5">
          <div class="skeleton w-6 h-6 rounded-full" />
          <div class="skeleton h-3.5 rounded flex-1 max-w-[40%]" />
        </div>
        <div class="flex items-center gap-2.5">
          <div class="skeleton w-6 h-6 rounded-full" />
          <div class="skeleton h-3.5 rounded flex-1 max-w-[55%]" />
        </div>
      </div>
    </div>
  </div>
</template>
