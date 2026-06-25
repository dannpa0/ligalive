<script setup lang="ts">
const props = defineProps<{ label: string; home: number; away: number; percent?: boolean }>()

const total = computed(() => props.home + props.away || 1)
const homePct = computed(() => (props.percent ? props.home : Math.round((props.home / total.value) * 100)))
const awayPct = computed(() => (props.percent ? props.away : 100 - homePct.value))

const homeLeads = computed(() => props.home > props.away)
const awayLeads = computed(() => props.away > props.home)
</script>

<template>
  <div class="py-2.5">
    <div class="flex items-center justify-between text-sm mb-1.5">
      <span class="font-bold tnum" :class="homeLeads ? 'text-ink' : 'text-muted'">
        {{ home }}{{ percent ? '%' : '' }}
      </span>
      <span class="text-xs font-medium text-muted">{{ label }}</span>
      <span class="font-bold tnum" :class="awayLeads ? 'text-ink' : 'text-muted'">
        {{ away }}{{ percent ? '%' : '' }}
      </span>
    </div>
    <div class="flex items-center gap-1 h-1.5">
      <div class="flex-1 h-full rounded-full bg-elevated overflow-hidden flex justify-end">
        <div
          class="h-full rounded-full transition-all duration-500"
          :class="homeLeads ? 'bg-brand-500' : 'bg-finished/70'"
          :style="{ width: homePct + '%' }"
        />
      </div>
      <div class="flex-1 h-full rounded-full bg-elevated overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500"
          :class="awayLeads ? 'bg-brand-500' : 'bg-finished/70'"
          :style="{ width: awayPct + '%' }"
        />
      </div>
    </div>
  </div>
</template>
