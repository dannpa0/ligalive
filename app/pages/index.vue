<script setup lang="ts">
import { relativeDay } from '~/utils/format'

const {
  leagues,
  liveMatches,
  upcomingMatches,
  finishedMatches,
  topScorers,
  getLeague,
} = useData()

// "Fast loading feel": show skeletons briefly on first mount.
const loading = ref(true)
onMounted(() => {
  setTimeout(() => (loading.value = false), 550)
})

const live = computed(() => liveMatches(6))
const latest = computed(() => finishedMatches(undefined, 10))
const scorers = computed(() => topScorers(undefined, 5))

// Upcoming today, grouped by league.
const upcomingTodayGroups = computed(() => {
  const today = upcomingMatches().filter((m) => relativeDay(m.kickoff) === 'Today')
  const groups = leagues
    .map((league) => ({
      league,
      matches: today.filter((m) => m.leagueId === league.id),
    }))
    .filter((g) => g.matches.length > 0)
  // Fallback: if dataset has no kickoffs labelled "Today", show the soonest upcoming.
  if (groups.length === 0) {
    const soon = upcomingMatches(undefined, 8)
    return leagues
      .map((league) => ({ league, matches: soon.filter((m) => m.leagueId === league.id) }))
      .filter((g) => g.matches.length > 0)
  }
  return groups
})

useHead({ title: 'LigaLive — Live Football Scores, Results & Statistics' })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 -z-10">
        <div class="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div class="absolute top-10 right-0 h-72 w-72 rounded-full bg-brand-600/10 blur-3xl" />
        <div
          class="absolute inset-0 opacity-[0.04]"
          style="background-image: radial-gradient(circle at 1px 1px, var(--color-ink) 1px, transparent 0); background-size: 22px 22px;"
        />
      </div>

      <div class="container-app py-14 md:py-20">
        <div class="max-w-2xl animate-rise">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold text-muted"
          >
            <span class="live-dot" />
            {{ live.length }} matches live right now
          </span>
          <h1 class="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Live Football Scores,
            <span class="text-brand-500">Results</span> &amp; Statistics
          </h1>
          <p class="mt-4 text-base text-muted md:text-lg">
            Follow matches from local and international leagues in real time.
          </p>
          <div class="mt-7 flex flex-wrap gap-3">
            <NuxtLink to="/livescore" class="btn btn-primary">
              <AppIcon name="live" :size="18" />
              View Live Matches
            </NuxtLink>
            <NuxtLink to="/livescore" class="btn btn-ghost">
              <AppIcon name="trophy" :size="18" />
              Explore Leagues
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <div class="container-app space-y-12 py-10 md:py-12">
      <!-- Live matches -->
      <section>
        <SectionHeader
          title="Live Matches"
          subtitle="Happening now across all leagues"
          icon="live"
          to="/livescore"
          link-label="See all"
        />
        <SkeletonLiveCard v-if="loading" :count="6" />
        <div v-else-if="live.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <LiveMatchCard v-for="m in live" :key="m.id" :match="m" />
        </div>
        <EmptyState
          v-else
          icon="live"
          title="No live matches"
          message="Check back soon — fixtures are scheduled throughout the day."
        />
      </section>

      <!-- Upcoming today -->
      <section>
        <SectionHeader title="Upcoming Matches" subtitle="Today's fixtures by league" icon="calendar" />
        <SkeletonMatchCard v-if="loading" :count="4" />
        <div v-else class="space-y-6">
          <div v-for="g in upcomingTodayGroups" :key="g.league.id">
            <div class="mb-2 flex items-center gap-2">
              <LeagueBadge :league="g.league" :size="22" />
              <h3 class="text-sm font-semibold">{{ g.league.name }}</h3>
            </div>
            <div class="grid gap-2.5 lg:grid-cols-2">
              <MatchCard v-for="m in g.matches" :key="m.id" :match="m" />
            </div>
          </div>
          <EmptyState
            v-if="!upcomingTodayGroups.length"
            icon="calendar"
            title="No upcoming matches"
            message="There are no scheduled fixtures to show."
          />
        </div>
      </section>

      <!-- Popular leagues -->
      <section>
        <SectionHeader title="Popular Leagues" subtitle="Top competitions to follow" icon="trophy" />
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <LeagueCard v-for="l in leagues" :key="l.id" :league="l" />
        </div>
      </section>

      <!-- Top scorers + latest results -->
      <div class="grid gap-8 lg:grid-cols-5">
        <section class="lg:col-span-2">
          <SectionHeader title="Top Scorers" subtitle="Across all leagues" icon="ball" />
          <div class="card overflow-hidden">
            <TopScorersTable :players="scorers" :show-assists="false" />
          </div>
        </section>

        <section class="lg:col-span-3">
          <SectionHeader title="Latest Results" subtitle="Recently finished matches" icon="whistle" />
          <SkeletonMatchCard v-if="loading" :count="5" />
          <div v-else class="grid gap-2.5">
            <MatchCard v-for="m in latest" :key="m.id" :match="m" show-league />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
