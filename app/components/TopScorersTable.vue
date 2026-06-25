<script setup lang="ts">
import type { Player } from '~/types'

withDefaults(defineProps<{ players: Player[]; showAssists?: boolean }>(), { showAssists: true })
const { getTeam } = useData()
</script>

<template>
  <div class="card overflow-hidden">
    <table class="w-full text-sm">
      <thead>
        <tr class="text-muted text-xs border-b border-line">
          <th class="text-left font-semibold py-3 pl-4 pr-2 w-10">#</th>
          <th class="text-left font-semibold py-3 px-2">Player</th>
          <th class="text-left font-semibold py-3 px-2 hidden sm:table-cell">Club</th>
          <th v-if="showAssists" class="font-semibold py-3 px-2 text-center w-12">Ast</th>
          <th class="font-semibold py-3 pr-4 pl-2 text-center w-14">Goals</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(p, i) in players"
          :key="p.id"
          class="border-b border-line/60 last:border-0 hover:bg-elevated transition-colors"
        >
          <td class="py-2.5 pl-4 pr-2">
            <span
              class="inline-grid place-items-center w-6 h-6 rounded text-xs font-bold tnum"
              :class="i === 0 ? 'bg-brand-500 text-[#04140a]' : 'text-muted'"
              >{{ i + 1 }}</span
            >
          </td>
          <td class="py-2.5 px-2">
            <div class="flex items-center gap-2.5 min-w-0">
              <TeamBadge :team="getTeam(p.teamId)" :size="26" />
              <div class="min-w-0">
                <div class="font-medium truncate">{{ p.name }}</div>
                <div class="text-[11px] text-muted sm:hidden truncate">{{ getTeam(p.teamId)?.shortName }}</div>
              </div>
            </div>
          </td>
          <td class="py-2.5 px-2 text-muted hidden sm:table-cell truncate">
            {{ getTeam(p.teamId)?.name }}
          </td>
          <td v-if="showAssists" class="py-2.5 px-2 text-center tnum text-muted">{{ p.assists }}</td>
          <td class="py-2.5 pr-4 pl-2 text-center font-bold tnum">{{ p.goals }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
