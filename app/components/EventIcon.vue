<script setup lang="ts">
import type { MatchEventType } from '~/types'

const props = defineProps<{ type: MatchEventType; size?: number }>()
const size = computed(() => props.size ?? 18)
</script>

<template>
  <!-- Goal / penalty -->
  <span v-if="type === 'goal' || type === 'penalty'" class="text-brand-500">
    <AppIcon name="ball" :size="size" />
  </span>

  <!-- Own goal -->
  <span v-else-if="type === 'own-goal'" class="text-live">
    <AppIcon name="ball" :size="size" />
  </span>

  <!-- Yellow card -->
  <span
    v-else-if="type === 'yellow'"
    class="inline-block rounded-[3px] bg-upcoming"
    :style="{ width: size * 0.62 + 'px', height: size * 0.86 + 'px' }"
  />

  <!-- Red card -->
  <span
    v-else-if="type === 'red'"
    class="inline-block rounded-[3px] bg-live"
    :style="{ width: size * 0.62 + 'px', height: size * 0.86 + 'px' }"
  />

  <!-- Substitution -->
  <span v-else-if="type === 'substitution'" class="text-brand-400">
    <AppIcon name="sub" :size="size" />
  </span>

  <!-- Assist / fallback -->
  <span v-else class="text-muted">
    <AppIcon name="ball" :size="size" />
  </span>
</template>
