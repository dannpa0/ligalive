<script setup lang="ts">
import type { Match, MatchEventType } from '~/types'

const props = defineProps<{ match: Match }>()

const labels: Record<MatchEventType, string> = {
  goal: 'Goal',
  penalty: 'Penalty',
  'own-goal': 'Own goal',
  assist: 'Assist',
  yellow: 'Yellow card',
  red: 'Red card',
  substitution: 'Substitution',
}

// newest first for the feed
const events = computed(() => [...props.match.events].sort((a, b) => b.minute - a.minute))
</script>

<template>
  <div v-if="events.length" class="card p-2 sm:p-4">
    <ul class="relative">
      <!-- center spine -->
      <span class="absolute left-1/2 top-0 bottom-0 w-px bg-line -translate-x-1/2" aria-hidden="true" />

      <li
        v-for="(e, i) in events"
        :key="i"
        class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2"
      >
        <!-- home side -->
        <div class="flex justify-end" :class="e.team === 'away' && 'opacity-0'">
          <div v-if="e.team === 'home'" class="flex items-center gap-2 text-right">
            <div class="min-w-0">
              <p class="text-sm font-medium truncate">{{ e.player }}</p>
              <p class="text-[11px] text-muted">{{ labels[e.type] }}</p>
            </div>
            <EventIcon :type="e.type" />
          </div>
        </div>

        <!-- minute pill -->
        <div
          class="grid place-items-center min-w-9 h-7 px-2 rounded-full bg-elevated border border-line text-xs font-bold tnum"
        >
          {{ e.minute }}'
        </div>

        <!-- away side -->
        <div class="flex justify-start" :class="e.team === 'home' && 'opacity-0'">
          <div v-if="e.team === 'away'" class="flex items-center gap-2 text-left">
            <EventIcon :type="e.type" />
            <div class="min-w-0">
              <p class="text-sm font-medium truncate">{{ e.player }}</p>
              <p class="text-[11px] text-muted">{{ labels[e.type] }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <EmptyState v-else icon="whistle" title="No events yet" message="Match events will appear here once the game kicks off." />
</template>
