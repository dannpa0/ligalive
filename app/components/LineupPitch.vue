<script setup lang="ts">
import type { Match, LineupPlayer } from '~/types'

const props = defineProps<{ match: Match }>()
const { getTeam } = useData()

const home = computed(() => getTeam(props.match.homeTeamId))
const away = computed(() => getTeam(props.match.awayTeamId))

function lines(formation: string, players: LineupPlayer[]): LineupPlayer[][] {
  const counts = [1, ...formation.split('-').map(Number)]
  const out: LineupPlayer[][] = []
  let idx = 0
  for (const c of counts) {
    out.push(players.slice(idx, idx + c))
    idx += c
  }
  return out
}

const homeLines = computed(() =>
  props.match.lineups ? lines(props.match.lineups.homeFormation, props.match.lineups.home) : [],
)
// away rendered top→bottom: GK first
const awayLines = computed(() =>
  props.match.lineups ? lines(props.match.lineups.awayFormation, props.match.lineups.away) : [],
)
// home rendered top→bottom: forwards first, GK last
const homeLinesTopDown = computed(() => [...homeLines.value].reverse())

const lastName = (n: string) => n.split(' ').slice(-1)[0]
</script>

<template>
  <div v-if="match.lineups" class="card overflow-hidden">
    <!-- formation header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-line text-sm">
      <span class="flex items-center gap-2 font-semibold">
        <TeamBadge :team="home" :size="22" /> {{ home?.shortName }}
        <span class="text-muted font-normal">· {{ match.lineups.homeFormation }}</span>
      </span>
      <span class="flex items-center gap-2 font-semibold">
        <span class="text-muted font-normal">{{ match.lineups.awayFormation }} ·</span>
        {{ away?.shortName }} <TeamBadge :team="away" :size="22" />
      </span>
    </div>

    <!-- pitch -->
    <div
      class="relative px-2 py-4"
      style="
        background:
          repeating-linear-gradient(180deg, #0c5132 0 40px, #0a4a2d 40px 80px);
      "
    >
      <!-- markings -->
      <div class="absolute inset-3 border border-white/20 rounded-sm pointer-events-none" />
      <div class="absolute left-3 right-3 top-1/2 h-px bg-white/20 pointer-events-none" />
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/20 pointer-events-none"
      />

      <div class="relative grid grid-rows-2 gap-2 min-h-[420px]">
        <!-- away half (top) -->
        <div class="flex flex-col justify-around">
          <div v-for="(ln, i) in awayLines" :key="'a' + i" class="flex justify-around items-center">
            <div v-for="p in ln" :key="p.number" class="flex flex-col items-center gap-1 w-14">
              <span
                class="grid place-items-center w-8 h-8 rounded-full text-xs font-bold ring-2 ring-white/30"
                :style="{ background: away?.color, color: '#fff' }"
                >{{ p.number }}</span
              >
              <span class="text-[10px] font-medium text-white/90 truncate max-w-full text-center">{{
                lastName(p.name)
              }}</span>
            </div>
          </div>
        </div>

        <!-- home half (bottom) -->
        <div class="flex flex-col justify-around">
          <div v-for="(ln, i) in homeLinesTopDown" :key="'h' + i" class="flex justify-around items-center">
            <div v-for="p in ln" :key="p.number" class="flex flex-col items-center gap-1 w-14">
              <span
                class="grid place-items-center w-8 h-8 rounded-full text-xs font-bold ring-2 ring-white/30"
                :style="{ background: home?.color, color: '#fff' }"
                >{{ p.number }}</span
              >
              <span class="text-[10px] font-medium text-white/90 truncate max-w-full text-center">{{
                lastName(p.name)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- text lists -->
    <div class="grid grid-cols-2 divide-x divide-line">
      <div class="p-4">
        <p class="text-xs font-semibold text-muted mb-2">{{ home?.name }} — Starting XI</p>
        <ul class="space-y-1.5">
          <li v-for="p in match.lineups.home" :key="p.number" class="flex items-center gap-2 text-sm">
            <span class="w-5 text-muted tnum text-xs">{{ p.number }}</span>
            <span class="truncate">{{ p.name }}</span>
            <span class="ml-auto text-[10px] text-muted">{{ p.position }}</span>
          </li>
        </ul>
      </div>
      <div class="p-4">
        <p class="text-xs font-semibold text-muted mb-2">{{ away?.name }} — Starting XI</p>
        <ul class="space-y-1.5">
          <li v-for="p in match.lineups.away" :key="p.number" class="flex items-center gap-2 text-sm">
            <span class="w-5 text-muted tnum text-xs">{{ p.number }}</span>
            <span class="truncate">{{ p.name }}</span>
            <span class="ml-auto text-[10px] text-muted">{{ p.position }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <EmptyState v-else icon="users" title="Lineups not announced" message="Starting line-ups are confirmed about an hour before kick-off." />
</template>
