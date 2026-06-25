<script setup lang="ts">
import type { MatchStatus } from '~/types'

const { leagues, matchesByLeague, getTeam } = useData()

type Filter = 'all' | 'live' | 'finished' | 'upcoming'
const filter = ref<Filter>('all')
const leagueId = ref<string>('')
const country = ref<string>('')
const search = ref<string>('')

const loading = ref(true)
onMounted(() => setTimeout(() => (loading.value = false), 500))

const filters: { id: Filter; label: string; icon?: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live', icon: 'live' },
  { id: 'finished', label: 'Finished', icon: 'whistle' },
  { id: 'upcoming', label: 'Upcoming', icon: 'calendar' },
]

const countries = computed(() => [...new Set(leagues.map((l) => l.country))].sort())

const statusFilter = computed<MatchStatus[] | undefined>(() =>
  filter.value === 'all' ? undefined : [filter.value as MatchStatus],
)

const groups = computed(() => {
  let g = matchesByLeague(statusFilter.value)
  if (leagueId.value) g = g.filter((x) => x.league.id === leagueId.value)
  if (country.value) g = g.filter((x) => x.league.country === country.value)

  const q = search.value.trim().toLowerCase()
  if (q) {
    g = g
      .map((x) => ({
        ...x,
        matches: x.matches.filter((m) => {
          const h = getTeam(m.homeTeamId)
          const a = getTeam(m.awayTeamId)
          return (
            h?.name.toLowerCase().includes(q) ||
            a?.name.toLowerCase().includes(q) ||
            h?.shortName.toLowerCase().includes(q) ||
            a?.shortName.toLowerCase().includes(q)
          )
        }),
      }))
      .filter((x) => x.matches.length > 0)
  }
  return g
})

const totalMatches = computed(() => groups.value.reduce((s, g) => s + g.matches.length, 0))

function reset() {
  filter.value = 'all'
  leagueId.value = ''
  country.value = ''
  search.value = ''
}

useHead({ title: 'Live Score — LigaLive' })
</script>

<template>
  <div class="container-app py-8">
    <div class="mb-6">
      <h1 class="font-display text-2xl font-bold md:text-3xl">Live Score</h1>
      <p class="mt-1 text-sm text-muted">All matches across every league, in one place.</p>
    </div>

    <!-- Filter bar -->
    <div class="card sticky top-[68px] z-30 mb-6 space-y-3 p-3.5 md:top-[76px]">
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          class="chip"
          :class="filter === f.id && 'chip-active'"
          @click="filter = f.id"
        >
          <span v-if="f.id === 'live'" class="live-dot" />
          <AppIcon v-else-if="f.icon" :name="f.icon" :size="14" />
          {{ f.label }}
        </button>
      </div>

      <div class="grid gap-2.5 sm:grid-cols-3">
        <select v-model="leagueId" class="field">
          <option value="">All Leagues</option>
          <option v-for="l in leagues" :key="l.id" :value="l.id">{{ l.name }}</option>
        </select>
        <select v-model="country" class="field">
          <option value="">All Countries</option>
          <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
        </select>
        <div class="relative">
          <AppIcon
            name="search"
            :size="16"
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Search team…"
            class="field pl-9"
          />
        </div>
      </div>

      <div class="flex items-center justify-between pt-0.5 text-xs text-muted">
        <span>{{ totalMatches }} match{{ totalMatches === 1 ? '' : 'es' }} found</span>
        <button type="button" class="font-semibold text-brand-500 hover:underline" @click="reset">
          Reset filters
        </button>
      </div>
    </div>

    <!-- Match list -->
    <SkeletonMatchCard v-if="loading" :count="6" />
    <div v-else-if="groups.length" class="space-y-3">
      <LeagueAccordion
        v-for="(g, i) in groups"
        :key="g.league.id"
        :league="g.league"
        :matches="g.matches"
        :default-open="i < 3"
      />
    </div>
    <EmptyState
      v-else
      icon="search"
      title="No matches found"
      message="Try adjusting your filters or search term."
    />
  </div>
</template>

<style scoped>
.field {
  width: 100%;
  border-radius: 0.6rem;
  border: 1px solid var(--color-line);
  background: var(--color-elevated);
  padding: 0.55rem 0.75rem;
  font-size: 0.875rem;
  color: var(--color-ink);
  outline: none;
  transition: border-color 0.15s ease;
}
.field:focus {
  border-color: var(--color-brand-500);
}
</style>
