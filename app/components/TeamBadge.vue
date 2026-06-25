<script setup lang="ts">
import type { Team } from '~/types'
import { readableOn } from '~/utils/format'

const props = withDefaults(defineProps<{ team?: Team; size?: number }>(), { size: 40 })

const fg = computed(() => (props.team ? readableOn(props.team.color) : '#fff'))
const fontSize = computed(() => Math.round(props.size * 0.36))
</script>

<template>
  <span
    class="inline-grid place-items-center rounded-full font-display font-bold shrink-0 ring-1 ring-black/10 dark:ring-white/10 select-none"
    :style="{
      width: size + 'px',
      height: size + 'px',
      background: team?.color ?? '#334155',
      color: fg,
      fontSize: fontSize + 'px',
    }"
    :title="team?.name"
  >
    {{ team?.abbr ?? '—' }}
  </span>
</template>
