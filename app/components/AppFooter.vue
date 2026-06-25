<script setup lang="ts">
const year = new Date().getFullYear()
const groups = [
  {
    title: 'Product',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Live Score', to: '/livescore' },
      { label: 'Leagues', to: '/league/premier-league' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/' },
      { label: 'Terms', to: '/' },
    ],
  },
]
</script>

<template>
  <footer class="border-t border-line mt-12">
    <div class="container-app py-10">
      <div class="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <AppLogo />
          <p class="text-sm text-muted mt-3 max-w-xs">
            Live football scores, results and statistics from local and international leagues in real time.
          </p>
        </div>
        <div v-for="g in groups" :key="g.title">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-muted mb-3">{{ g.title }}</h4>
          <ul class="space-y-2">
            <li v-for="l in g.links" :key="l.label">
              <NuxtLink :to="l.to" class="text-sm text-muted hover:text-brand-500 transition-colors">
                {{ l.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-muted">© {{ year }} LigaLive. Demo project — all data is fictional.</p>
        <p class="text-xs text-muted">Built with Nuxt 4 · TypeScript · Tailwind CSS</p>
      </div>
    </div>
  </footer>
</template>
