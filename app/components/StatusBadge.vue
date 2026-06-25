<script setup lang="ts">
import type { Match } from '~/types'
import { formatTime } from '~/utils/format'

const props = defineProps<{ match: Match }>()
</script>

<template>
  <span
    v-if="match.status === 'live'"
    class="chip live-dot border-live/40 bg-live/10 text-live"
    style="--tw-ring-color: var(--color-live)"
  >
    <span class="w-1.5 h-1.5 rounded-full bg-live" />
    LIVE
  </span>

  <span v-else-if="match.status === 'finished'" class="chip text-finished">FT</span>

  <span v-else class="chip text-upcoming border-upcoming/40">
    {{ formatTime(match.kickoff) }}
  </span>
</template>
