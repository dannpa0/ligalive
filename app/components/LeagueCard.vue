<script setup lang="ts">
import type { League } from '~/types'

defineProps<{ league: League }>()
</script>

<template>
  <NuxtLink
    :to="`/league/${league.slug}`"
    class="card p-4 flex items-center gap-3.5 hover:border-brand-500/50 hover:-translate-y-0.5 transition-all duration-200 group"
  >
    <LeagueBadge :league="league" :size="44" />
    <div class="min-w-0">
      <h3 class="font-semibold truncate group-hover:text-brand-500 transition-colors">
        {{ league.name }}
      </h3>
      <p class="text-xs text-muted mt-0.5">{{ league.country }} · {{ league.teamCount }} teams</p>
    </div>
    <AppIcon name="chevron-right" :size="18" class="ml-auto text-muted shrink-0" />
  </NuxtLink>
</template>
