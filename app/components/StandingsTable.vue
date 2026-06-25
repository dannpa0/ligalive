<script setup lang="ts">
import type { StandingRow } from '~/types'

defineProps<{ rows: StandingRow[] }>()

const cols = [
  { key: 'played', label: 'P', full: 'Played' },
  { key: 'win', label: 'W', full: 'Win' },
  { key: 'draw', label: 'D', full: 'Draw' },
  { key: 'lose', label: 'L', full: 'Lose' },
  { key: 'goalsFor', label: 'GF', full: 'Goals For' },
  { key: 'goalsAgainst', label: 'GA', full: 'Goals Against' },
  { key: 'goalDiff', label: 'GD', full: 'Goal Diff' },
] as const
</script>

<template>
  <div class="card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-muted text-xs border-b border-line">
            <th class="text-left font-semibold py-3 pl-4 pr-2 w-8">#</th>
            <th class="text-left font-semibold py-3 px-2">Team</th>
            <th v-for="c in cols" :key="c.key" class="font-semibold py-3 px-2 text-center w-9 tnum">
              {{ c.label }}
            </th>
            <th class="font-semibold py-3 px-2 text-center w-12">Pts</th>
            <th class="font-semibold py-3 pr-4 pl-2 text-right hidden md:table-cell">Form</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.team.id"
            class="border-b border-line/60 last:border-0 hover:bg-elevated transition-colors"
          >
            <td class="py-2.5 pl-4 pr-2">
              <span
                class="inline-grid place-items-center w-6 h-6 rounded text-xs font-bold tnum"
                :class="
                  row.position === 1
                    ? 'bg-brand-500 text-[#04140a]'
                    : row.position <= 2
                      ? 'bg-brand-500/15 text-brand-500'
                      : 'text-muted'
                "
              >
                {{ row.position }}
              </span>
            </td>
            <td class="py-2.5 px-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <TeamBadge :team="row.team" :size="26" />
                <span class="font-medium truncate">{{ row.team.name }}</span>
              </div>
            </td>
            <td v-for="c in cols" :key="c.key" class="py-2.5 px-2 text-center tnum text-muted">
              {{ c.key === 'goalDiff' && row.goalDiff > 0 ? '+' : '' }}{{ row[c.key] }}
            </td>
            <td class="py-2.5 px-2 text-center font-bold tnum">{{ row.points }}</td>
            <td class="py-2.5 pr-4 pl-2 hidden md:table-cell">
              <div class="flex justify-end">
                <FormBadges :form="row.form" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
