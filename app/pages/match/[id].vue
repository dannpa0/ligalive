<script setup lang="ts">
import { relativeDay, formatTime } from '~/utils/format'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { getMatch, getTeam, getLeague, standings } = useData()

const match = computed(() => getMatch(id.value))
const league = computed(() => (match.value ? getLeague(match.value.leagueId) : undefined))
const home = computed(() => (match.value ? getTeam(match.value.homeTeamId) : undefined))
const away = computed(() => (match.value ? getTeam(match.value.awayTeamId) : undefined))

const tab = ref('timeline')
const tabs = computed(() => {
  const base = [{ id: 'timeline', label: 'Match Center', icon: 'whistle' }]
  if (match.value?.stats) base.push({ id: 'stats', label: 'Statistics', icon: 'stats' })
  if (match.value?.lineups) base.push({ id: 'lineups', label: 'Lineups', icon: 'pitch' })
  base.push({ id: 'h2h', label: 'Head to Head', icon: 'users' })
  return base
})

// Recent form derived from the league standings for each side.
const formFor = (teamId?: string) => {
  if (!match.value || !teamId) return []
  return standings(match.value.leagueId).find((r) => r.team.id === teamId)?.form ?? []
}
const homeForm = computed(() => formFor(home.value?.id))
const awayForm = computed(() => formFor(away.value?.id))

const statRows = computed(() => {
  const s = match.value?.stats
  if (!s) return []
  return [
    { label: 'Possession', home: s.possession[0], away: s.possession[1], percent: true },
    { label: 'Shots', home: s.shots[0], away: s.shots[1] },
    { label: 'Shots on Target', home: s.shotsOnTarget[0], away: s.shotsOnTarget[1] },
    { label: 'Corners', home: s.corners[0], away: s.corners[1] },
    { label: 'Fouls', home: s.fouls[0], away: s.fouls[1] },
    { label: 'Yellow Cards', home: s.yellowCards[0], away: s.yellowCards[1] },
    { label: 'Red Cards', home: s.redCards[0], away: s.redCards[1] },
  ]
})

const kickoffLabel = computed(() => {
  if (!match.value) return ''
  return `${relativeDay(match.value.kickoff)} · ${formatTime(match.value.kickoff)}`
})

watchEffect(() => {
  useHead({
    title:
      home.value && away.value
        ? `${home.value.shortName} vs ${away.value.shortName} — LigaLive`
        : 'Match — LigaLive',
  })
})
</script>

<template>
  <div v-if="match && home && away && league">
    <!-- Header -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 -z-10">
        <div
          class="absolute inset-0"
          :style="{
            background: `linear-gradient(135deg, ${home.color}22, transparent 45%, ${away.color}22)`,
          }"
        />
      </div>

      <div class="container-app py-6 md:py-8">
        <div class="mb-5 flex items-center justify-center gap-2 text-sm text-muted">
          <LeagueBadge :league="league" :size="20" />
          <NuxtLink :to="`/league/${league.slug}`" class="font-medium hover:text-ink">
            {{ league.name }}
          </NuxtLink>
        </div>

        <div class="grid grid-cols-3 items-center gap-2">
          <!-- Home -->
          <NuxtLink :to="`/league/${league.slug}`" class="flex flex-col items-center gap-2 text-center">
            <TeamBadge :team="home" :size="64" />
            <span class="text-sm font-semibold md:text-base">{{ home.name }}</span>
          </NuxtLink>

          <!-- Score -->
          <div class="flex flex-col items-center">
            <div class="font-display text-4xl font-bold tnum md:text-5xl">
              <span :class="match.status === 'upcoming' && 'text-muted'">
                {{ match.status === 'upcoming' ? '–' : match.homeScore }}
              </span>
              <span class="mx-2 text-muted">:</span>
              <span :class="match.status === 'upcoming' && 'text-muted'">
                {{ match.status === 'upcoming' ? '–' : match.awayScore }}
              </span>
            </div>
            <div class="mt-2">
              <span
                v-if="match.status === 'live'"
                class="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-xs font-bold text-live"
              >
                <span class="live-dot" /> {{ match.minute }}'
              </span>
              <span
                v-else-if="match.status === 'finished'"
                class="rounded-full bg-finished/15 px-2.5 py-1 text-xs font-bold text-finished"
              >
                Full Time
              </span>
              <span v-else class="rounded-full bg-upcoming/15 px-2.5 py-1 text-xs font-bold text-upcoming">
                {{ kickoffLabel }}
              </span>
            </div>
          </div>

          <!-- Away -->
          <NuxtLink :to="`/league/${league.slug}`" class="flex flex-col items-center gap-2 text-center">
            <TeamBadge :team="away" :size="64" />
            <span class="text-sm font-semibold md:text-base">{{ away.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <div class="container-app py-8">
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Main column -->
        <div class="space-y-6 lg:col-span-2">
          <TabGroup v-model="tab" :tabs="tabs" />

          <div v-if="tab === 'timeline'">
            <MatchTimeline :match="match" />
          </div>

          <div v-else-if="tab === 'stats'" class="card p-5">
            <div class="mb-4 flex items-center justify-between text-xs font-semibold text-muted">
              <span>{{ home.shortName }}</span>
              <span>Statistics</span>
              <span>{{ away.shortName }}</span>
            </div>
            <div class="space-y-4">
              <StatBar
                v-for="r in statRows"
                :key="r.label"
                :label="r.label"
                :home="r.home"
                :away="r.away"
                :percent="r.percent"
              />
            </div>
          </div>

          <div v-else-if="tab === 'lineups'">
            <LineupPitch :match="match" />
          </div>

          <div v-else-if="tab === 'h2h'">
            <H2HList :match="match" />
          </div>
        </div>

        <!-- Side column -->
        <div class="space-y-6">
          <!-- Recent form -->
          <section class="card p-5">
            <h2 class="mb-4 flex items-center gap-2 text-sm font-semibold">
              <AppIcon name="stats" :size="16" class="text-brand-500" /> Recent Form
            </h2>
            <div class="space-y-4">
              <div>
                <div class="mb-2 flex items-center gap-2">
                  <TeamBadge :team="home" :size="24" />
                  <span class="text-sm font-medium">{{ home.name }}</span>
                </div>
                <FormBadges v-if="homeForm.length" :form="homeForm" size="md" />
                <p v-else class="text-xs text-muted">No recent matches.</p>
              </div>
              <div class="border-t border-line pt-4">
                <div class="mb-2 flex items-center gap-2">
                  <TeamBadge :team="away" :size="24" />
                  <span class="text-sm font-medium">{{ away.name }}</span>
                </div>
                <FormBadges v-if="awayForm.length" :form="awayForm" size="md" />
                <p v-else class="text-xs text-muted">No recent matches.</p>
              </div>
            </div>
          </section>

          <!-- Match info -->
          <section class="card p-5">
            <h2 class="mb-4 flex items-center gap-2 text-sm font-semibold">
              <AppIcon name="info" :size="16" class="text-brand-500" /> Match Info
            </h2>
            <dl class="space-y-2.5 text-sm">
              <div class="flex justify-between">
                <dt class="text-muted">Competition</dt>
                <dd class="font-medium">{{ league.name }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted">Kick-off</dt>
                <dd class="font-medium">{{ kickoffLabel }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted">Venue</dt>
                <dd class="text-right font-medium">{{ home.stadium }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted">Season</dt>
                <dd class="font-medium">{{ league.season }}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="container-app py-20">
    <EmptyState icon="whistle" title="Match not found" message="This match doesn't exist or has been removed." />
    <div class="mt-6 text-center">
      <NuxtLink to="/livescore" class="btn btn-primary">Browse live scores</NuxtLink>
    </div>
  </div>
</template>
