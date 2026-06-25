<script setup lang="ts">
import type { Match } from '~/types'

const props = defineProps<{ match: Match }>()
const { getTeam, getLeague } = useData()

const home = computed(() => getTeam(props.match.homeTeamId))
const away = computed(() => getTeam(props.match.awayTeamId))
const league = computed(() => getLeague(props.match.leagueId))
</script>

<template>
  <article class="card p-4 flex flex-col gap-4 hover:border-brand-500/50 transition-colors group">
    <!-- header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 min-w-0">
        <LeagueBadge :league="league" :size="22" />
        <span class="text-xs font-medium text-muted truncate">{{ league?.name }}</span>
      </div>
      <StatusBadge :match="match" />
    </div>

    <!-- score -->
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <div class="flex flex-col items-center gap-2 text-center">
        <TeamBadge :team="home" :size="48" />
        <span class="text-sm font-semibold leading-tight">{{ home?.shortName }}</span>
      </div>

      <div class="flex flex-col items-center px-2">
        <div class="font-display text-3xl font-bold tnum leading-none">
          {{ match.homeScore }}<span class="text-muted mx-1.5">·</span>{{ match.awayScore }}
        </div>
        <div class="mt-1 text-xs font-semibold text-live tnum">{{ match.minute }}'</div>
      </div>

      <div class="flex flex-col items-center gap-2 text-center">
        <TeamBadge :team="away" :size="48" />
        <span class="text-sm font-semibold leading-tight">{{ away?.shortName }}</span>
      </div>
    </div>

    <NuxtLink :to="`/match/${match.id}`" class="btn btn-ghost w-full text-sm">
      Match details
      <AppIcon name="arrow-right" :size="16" />
    </NuxtLink>
  </article>
</template>
