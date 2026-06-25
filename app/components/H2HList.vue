<script setup lang="ts">
import type { Match } from '~/types'
import { formatDate } from '~/utils/format'

const props = defineProps<{ match: Match }>()
const { getTeam } = useData()
</script>

<template>
  <div class="card divide-y divide-line">
    <div
      v-for="(h, i) in match.h2h"
      :key="i"
      class="flex items-center gap-3 px-4 py-3 text-sm"
    >
      <span class="text-xs text-muted w-12 shrink-0">{{ formatDate(h.date) }}</span>
      <div class="flex-1 flex items-center justify-end gap-2 min-w-0">
        <span class="truncate font-medium" :class="h.homeScore > h.awayScore && 'text-brand-500'">
          {{ getTeam(h.homeTeamId)?.shortName }}
        </span>
        <TeamBadge :team="getTeam(h.homeTeamId)" :size="22" />
      </div>
      <span
        class="px-2.5 py-1 rounded-lg bg-elevated font-bold tnum text-sm shrink-0"
      >
        {{ h.homeScore }} - {{ h.awayScore }}
      </span>
      <div class="flex-1 flex items-center gap-2 min-w-0">
        <TeamBadge :team="getTeam(h.awayTeamId)" :size="22" />
        <span class="truncate font-medium" :class="h.awayScore > h.homeScore && 'text-brand-500'">
          {{ getTeam(h.awayTeamId)?.shortName }}
        </span>
      </div>
    </div>
  </div>
</template>
