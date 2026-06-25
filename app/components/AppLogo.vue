<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2.5 group" aria-label="LigaLive home">
    <span
      class="grid place-items-center w-9 h-9 rounded-xl bg-brand-500 text-[#04140a] shadow-lg shadow-brand-500/20 transition-transform group-hover:-rotate-6"
    >
      <AppIcon name="ball" :size="22" />
    </span>
    <span v-if="!compact" class="font-display text-xl font-bold tracking-tight">
      Liga<span class="text-brand-500">Live</span>
    </span>
  </NuxtLink>
</template>
