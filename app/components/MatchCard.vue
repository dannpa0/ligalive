<script setup lang="ts">
import type { Match } from '~/types'
import { formatTime, relativeDay } from '~/utils/format'

const props = withDefaults(defineProps<{ match: Match; showLeague?: boolean }>(), {
  showLeague: false,
})
const { getTeam, getLeague } = useData()

const home = computed(() => getTeam(props.match.homeTeamId))
const away = computed(() => getTeam(props.match.awayTeamId))
const league = computed(() => getLeague(props.match.leagueId))
const isUpcoming = computed(() => props.match.status === 'upcoming')

function winner(side: 'home' | 'away') {
  if (props.match.status === 'upcoming') return false
  return side === 'home'
    ? props.match.homeScore > props.match.awayScore
    : props.match.awayScore > props.match.homeScore
}
</script>

<template>
  <NuxtLink
    :to="`/match/${match.id}`"
    class="flex items-center gap-3 px-3 sm:px-4 py-3 hover:bg-elevated transition-colors"
  >
    <!-- status / minute column -->
    <div class="w-12 shrink-0 flex flex-col items-center justify-center">
      <template v-if="match.status === 'live'">
        <span class="flex items-center gap-1 text-[11px] font-bold text-live">
          <span class="w-1.5 h-1.5 rounded-full bg-live live-dot" />
        </span>
        <span class="text-xs font-bold text-live tnum">{{ match.minute }}'</span>
      </template>
      <template v-else-if="match.status === 'finished'">
        <span class="text-[11px] font-semibold text-finished">FT</span>
      </template>
      <template v-else>
        <span class="text-xs font-semibold text-muted tnum">{{ formatTime(match.kickoff) }}</span>
      </template>
    </div>

    <div class="w-px self-stretch bg-line" />

    <!-- teams -->
    <div class="flex-1 min-w-0 flex flex-col gap-1.5">
      <div class="flex items-center gap-2.5">
        <TeamBadge :team="home" :size="24" />
        <span class="text-sm truncate flex-1" :class="winner('home') ? 'font-bold' : 'font-medium'">
          {{ home?.name }}
        </span>
        <span
          v-if="!isUpcoming"
          class="text-sm tnum w-5 text-right"
          :class="winner('home') ? 'font-bold' : 'text-muted'"
          >{{ match.homeScore }}</span
        >
      </div>
      <div class="flex items-center gap-2.5">
        <TeamBadge :team="away" :size="24" />
        <span class="text-sm truncate flex-1" :class="winner('away') ? 'font-bold' : 'font-medium'">
          {{ away?.name }}
        </span>
        <span
          v-if="!isUpcoming"
          class="text-sm tnum w-5 text-right"
          :class="winner('away') ? 'font-bold' : 'text-muted'"
          >{{ match.awayScore }}</span
        >
      </div>
    </div>

    <div v-if="showLeague || isUpcoming" class="hidden sm:flex flex-col items-end gap-1 pl-2 shrink-0">
      <span v-if="showLeague" class="text-[11px] text-muted">{{ league?.name }}</span>
      <span v-if="isUpcoming" class="text-[11px] text-muted">{{ relativeDay(match.kickoff) }}</span>
    </div>

    <AppIcon name="chevron-right" :size="16" class="text-muted shrink-0" />
  </NuxtLink>
</template>
