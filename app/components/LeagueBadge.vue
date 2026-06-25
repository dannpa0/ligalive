<script setup lang="ts">
import type { League } from '~/types'
import { readableOn } from '~/utils/format'

const props = withDefaults(defineProps<{ league?: League; size?: number; rounded?: string }>(), {
  size: 36,
  rounded: '0.6rem',
})

const fg = computed(() => (props.league ? readableOn(props.league.color) : '#fff'))
const initials = computed(() =>
  (props.league?.name ?? '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <span
    class="inline-grid place-items-center font-display font-bold shrink-0 select-none"
    :style="{
      width: size + 'px',
      height: size + 'px',
      background: league?.color ?? '#334155',
      color: fg,
      borderRadius: rounded,
      fontSize: Math.round(size * 0.34) + 'px',
    }"
    :title="league?.name"
  >
    {{ initials }}
  </span>
</template>
