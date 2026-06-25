<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const {
  getLeagueBySlug,
  leagueStats,
  standings,
  upcomingMatches,
  finishedMatches,
  topScorers,
} = useData()

const league = computed(() => getLeagueBySlug(slug.value))

const tab = ref('overview')
const tabs = [
  { id: 'overview', label: 'Overview', icon: 'info' },
  { id: 'standings', label: 'Standings', icon: 'stats' },
  { id: 'fixtures', label: 'Fixtures', icon: 'calendar' },
  { id: 'results', label: 'Results', icon: 'whistle' },
  { id: 'scorers', label: 'Top Scorers', icon: 'ball' },
]

const stats = computed(() => (league.value ? leagueStats(league.value.id) : null))
const table = computed(() => (league.value ? standings(league.value.id) : []))
const fixtures = computed(() => (league.value ? upcomingMatches(league.value.id) : []))
const results = computed(() => (league.value ? finishedMatches(league.value.id) : []))
const scorers = computed(() => (league.value ? topScorers(league.value.id, 10) : []))

const statCards = computed(() =>
  stats.value
    ? [
        { label: 'Total Teams', value: stats.value.totalTeams, icon: 'users' },
        { label: 'Total Matches', value: stats.value.totalMatches, icon: 'calendar' },
        { label: 'Goals Scored', value: stats.value.goalsScored, icon: 'ball' },
        { label: 'Average Goals', value: stats.value.avgGoals, icon: 'stats' },
      ]
    : [],
)

watchEffect(() => {
  useHead({ title: league.value ? `${league.value.name} — LigaLive` : 'League — LigaLive' })
})
</script>

<template>
  <div v-if="league">
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 -z-10">
        <div
          class="absolute inset-0"
          :style="{
            background: `linear-gradient(135deg, ${league.color}33, transparent 60%)`,
          }"
        />
        <div
          class="absolute inset-0 opacity-[0.05]"
          style="background-image: repeating-linear-gradient(90deg, var(--color-ink) 0 2px, transparent 2px 60px);"
        />
      </div>
      <div class="container-app py-10 md:py-12">
        <NuxtLink to="/livescore" class="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <AppIcon name="chevron-right" :size="16" class="rotate-180" /> All leagues
        </NuxtLink>
        <div class="flex items-center gap-4">
          <LeagueBadge :league="league" :size="68" rounded="1rem" />
          <div>
            <h1 class="font-display text-3xl font-bold md:text-4xl">{{ league.name }}</h1>
            <div class="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span class="inline-flex items-center gap-1">
                <AppIcon name="flag" :size="14" /> {{ league.country }}
              </span>
              <span class="text-line">•</span>
              <span>Season {{ league.season }}</span>
              <span class="text-line">•</span>
              <span>{{ league.teamCount }} teams</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container-app py-8">
      <!-- Stat cards -->
      <div class="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div v-for="s in statCards" :key="s.label" class="card p-4">
          <div class="flex items-center gap-2 text-muted">
            <AppIcon :name="s.icon" :size="16" />
            <span class="text-xs font-medium">{{ s.label }}</span>
          </div>
          <p class="mt-2 font-display text-2xl font-bold tnum">{{ s.value }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <TabGroup v-model="tab" :tabs="tabs" class="mb-6" />

      <!-- Overview -->
      <div v-if="tab === 'overview'" class="grid gap-8 lg:grid-cols-5">
        <section class="lg:col-span-3">
          <h2 class="mb-3 text-sm font-semibold text-muted">Standings</h2>
          <div class="card overflow-hidden">
            <StandingsTable :rows="table.slice(0, 6)" />
          </div>
          <button
            type="button"
            class="mt-3 text-sm font-semibold text-brand-500 hover:underline"
            @click="tab = 'standings'"
          >
            View full table →
          </button>
        </section>
        <section class="lg:col-span-2">
          <h2 class="mb-3 text-sm font-semibold text-muted">Top Scorers</h2>
          <div class="card overflow-hidden">
            <TopScorersTable :players="scorers.slice(0, 5)" :show-assists="false" />
          </div>
        </section>
      </div>

      <!-- Standings -->
      <div v-else-if="tab === 'standings'" class="card overflow-hidden">
        <StandingsTable :rows="table" />
      </div>

      <!-- Fixtures -->
      <div v-else-if="tab === 'fixtures'">
        <div v-if="fixtures.length" class="grid gap-2.5 lg:grid-cols-2">
          <MatchCard v-for="m in fixtures" :key="m.id" :match="m" />
        </div>
        <EmptyState v-else icon="calendar" title="No upcoming fixtures" />
      </div>

      <!-- Results -->
      <div v-else-if="tab === 'results'">
        <div v-if="results.length" class="grid gap-2.5 lg:grid-cols-2">
          <MatchCard v-for="m in results" :key="m.id" :match="m" />
        </div>
        <EmptyState v-else icon="whistle" title="No results yet" />
      </div>

      <!-- Top scorers -->
      <div v-else-if="tab === 'scorers'" class="card overflow-hidden">
        <TopScorersTable :players="scorers" />
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="container-app py-20">
    <EmptyState
      icon="trophy"
      title="League not found"
      message="The league you're looking for doesn't exist."
    />
    <div class="mt-6 text-center">
      <NuxtLink to="/" class="btn btn-primary">Back to home</NuxtLink>
    </div>
  </div>
</template>
