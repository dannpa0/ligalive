<script setup lang="ts">
import type { FormResult } from '~/types'

withDefaults(defineProps<{ form: FormResult[]; size?: 'sm' | 'md' }>(), { size: 'sm' })

const cls: Record<FormResult, string> = {
  W: 'bg-brand-500 text-[#04140a]',
  D: 'bg-finished/30 text-muted',
  L: 'bg-live text-white',
}
</script>

<template>
  <div class="flex items-center gap-1">
    <span
      v-for="(r, i) in form"
      :key="i"
      class="grid place-items-center rounded font-bold tnum"
      :class="[cls[r], size === 'md' ? 'w-6 h-6 text-xs' : 'w-5 h-5 text-[10px]']"
    >
      {{ r }}
    </span>
    <span v-if="!form.length" class="text-xs text-muted">—</span>
  </div>
</template>
