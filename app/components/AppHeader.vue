<script setup lang="ts">
const route = useRoute()
const { searchTeams, leagues } = useData()

const nav = [
  { to: '/', label: 'Home', icon: 'home', match: (p: string) => p === '/' },
  { to: '/livescore', label: 'Live Score', icon: 'live', match: (p: string) => p.startsWith('/livescore') },
  { to: '/league/premier-league', label: 'Leagues', icon: 'trophy', match: (p: string) => p.startsWith('/league') },
]

const searchOpen = ref(false)
const query = ref('')
const results = computed(() => searchTeams(query.value).slice(0, 6))

watch(searchOpen, (v) => {
  if (v) nextTick(() => document.getElementById('global-search')?.focus())
  else query.value = ''
})
watch(() => route.fullPath, () => (searchOpen.value = false))
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-line backdrop-blur-xl"
    style="background: var(--header-bg)"
  >
    <div class="container-app">
      <div class="h-16 flex items-center gap-4">
        <AppLogo class="shrink-0" />

        <!-- center nav (desktop) -->
        <nav class="hidden md:flex items-center gap-1 mx-auto">
          <NuxtLink
            v-for="n in nav"
            :key="n.to"
            :to="n.to"
            class="px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors"
            :class="n.match(route.path) ? 'text-brand-500 bg-brand-500/10' : 'text-muted hover:text-ink hover:bg-elevated'"
          >
            {{ n.label }}
          </NuxtLink>
        </nav>

        <!-- right actions -->
        <div class="flex items-center gap-1 ml-auto md:ml-0 shrink-0">
          <button
            type="button"
            class="grid place-items-center w-9 h-9 rounded-lg text-muted hover:text-ink hover:bg-elevated transition-colors"
            aria-label="Search"
            @click="searchOpen = true"
          >
            <AppIcon name="search" :size="19" />
          </button>
          <button
            type="button"
            class="relative grid place-items-center w-9 h-9 rounded-lg text-muted hover:text-ink hover:bg-elevated transition-colors"
            aria-label="Notifications"
          >
            <AppIcon name="bell" :size="19" />
            <span class="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-live ring-2 ring-card" />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>

    <!-- search overlay -->
    <Teleport to="body">
      <Transition name="page">
        <div
          v-if="searchOpen"
          class="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm"
          @click.self="searchOpen = false"
        >
          <div class="w-full max-w-lg card p-2 animate-rise">
            <div class="flex items-center gap-2 px-3">
              <AppIcon name="search" :size="20" class="text-muted" />
              <input
                id="global-search"
                v-model="query"
                type="text"
                placeholder="Search teams…"
                class="flex-1 bg-transparent py-3 outline-none text-sm"
                @keydown.esc="searchOpen = false"
              />
              <button class="text-muted hover:text-ink" aria-label="Close" @click="searchOpen = false">
                <AppIcon name="x" :size="18" />
              </button>
            </div>

            <div v-if="query && results.length" class="mt-1 border-t border-line pt-1">
              <NuxtLink
                v-for="t in results"
                :key="t.id"
                :to="`/league/${leagues.find((l) => l.id === t.leagueId)?.slug}`"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-elevated transition-colors"
              >
                <TeamBadge :team="t" :size="30" />
                <div class="min-w-0">
                  <div class="text-sm font-medium truncate">{{ t.name }}</div>
                  <div class="text-[11px] text-muted">{{ t.stadium }}</div>
                </div>
              </NuxtLink>
            </div>
            <div v-else-if="query" class="px-3 py-6 text-center text-sm text-muted">
              No teams match “{{ query }}”.
            </div>
            <div v-else class="px-3 py-6 text-center text-sm text-muted">
              Try “Arsenal”, “Madrid”, or “Persib”.
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
