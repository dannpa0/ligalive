<script setup lang="ts">
defineProps<{ icon?: string; title: string; message?: string }>()
</script>

<template>
  <div class="card flex flex-col items-center text-center gap-2 py-12 px-6">
    <span class="grid place-items-center w-12 h-12 rounded-full bg-elevated text-muted mb-1">
      <AppIcon :name="icon ?? 'info'" :size="24" />
    </span>
    <h3 class="font-semibold">{{ title }}</h3>
    <p v-if="message" class="text-sm text-muted max-w-xs">{{ message }}</p>
  </div>
</template>
