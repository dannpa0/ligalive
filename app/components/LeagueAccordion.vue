<script setup lang="ts">
import type { League, Match } from '~/types'

const props = defineProps<{ league: League; matches: Match[]; defaultOpen?: boolean }>()
const open = ref(props.defaultOpen ?? true)

const liveCount = computed(() => props.matches.filter((m) => m.status === 'live').length)
</script>

<template>
  <section class="card overflow-hidden">
    <button
      type="button"
      class="w-full flex items-center gap-3 px-4 py-3 hover:bg-elevated transition-colors"
      :aria-expanded="open"
      @click="open = !open"
    >
      <LeagueBadge :league="league" :size="30" />
      <div class="text-left min-w-0">
        <h3 class="font-semibold truncate">{{ league.name }}</h3>
        <p class="text-[11px] text-muted">{{ league.country }}</p>
      </div>
      <span
        v-if="liveCount"
        class="chip live-dot border-live/40 bg-live/10 text-live ml-1"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-live" />
        {{ liveCount }} live
      </span>
      <span class="ml-auto flex items-center gap-2 text-muted text-xs">
        {{ matches.length }}
        <AppIcon name="chevron-down" :size="18" class="transition-transform" :class="open && 'rotate-180'" />
      </span>
    </button>

    <div v-show="open" class="divide-y divide-line border-t border-line">
      <MatchCard v-for="m in matches" :key="m.id" :match="m" />
    </div>
  </section>
</template>
