<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; to?: string; linkLabel?: string; icon?: string }>()
</script>

<template>
  <div class="flex items-end justify-between gap-4 mb-4">
    <div class="flex items-center gap-2.5">
      <span v-if="icon" class="grid place-items-center w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500">
        <AppIcon :name="icon" :size="18" />
      </span>
      <div>
        <h2 class="font-display text-lg sm:text-xl font-bold">{{ title }}</h2>
        <p v-if="subtitle" class="text-sm text-muted">{{ subtitle }}</p>
      </div>
    </div>
    <NuxtLink
      v-if="to"
      :to="to"
      class="text-sm font-semibold text-brand-500 hover:text-brand-400 flex items-center gap-1 shrink-0"
    >
      {{ linkLabel ?? 'View all' }}
      <AppIcon name="arrow-right" :size="15" />
    </NuxtLink>
  </div>
</template>
