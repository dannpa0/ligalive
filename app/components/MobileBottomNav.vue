<script setup lang="ts">
const route = useRoute()
const items = [
  { to: '/', label: 'Home', icon: 'home', match: (p: string) => p === '/' },
  { to: '/livescore', label: 'Live', icon: 'live', match: (p: string) => p.startsWith('/livescore') },
  { to: '/league/premier-league', label: 'Leagues', icon: 'trophy', match: (p: string) => p.startsWith('/league') },
]
</script>

<template>
  <nav
    class="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line backdrop-blur-xl"
    style="background: var(--header-bg); padding-bottom: env(safe-area-inset-bottom)"
  >
    <div class="grid grid-cols-3">
      <NuxtLink
        v-for="i in items"
        :key="i.to"
        :to="i.to"
        class="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors"
        :class="i.match(route.path) ? 'text-brand-500' : 'text-muted'"
      >
        <AppIcon :name="i.icon" :size="22" />
        {{ i.label }}
      </NuxtLink>
    </div>
  </nav>
</template>
