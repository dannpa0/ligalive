<script setup lang="ts">
const props = defineProps<{ tabs: { id: string; label: string; icon?: string }[]; modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <div class="border-b border-line overflow-x-auto no-scrollbar">
    <div class="flex gap-1 min-w-max">
      <button
        v-for="t in tabs"
        :key="t.id"
        type="button"
        class="relative flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors"
        :class="modelValue === t.id ? 'text-brand-500' : 'text-muted hover:text-ink'"
        :aria-selected="modelValue === t.id"
        role="tab"
        @click="emit('update:modelValue', t.id)"
      >
        <AppIcon v-if="t.icon" :name="t.icon" :size="16" />
        {{ t.label }}
        <span
          v-if="modelValue === t.id"
          class="absolute left-2 right-2 -bottom-px h-0.5 rounded-full bg-brand-500"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  scrollbar-width: none;
}
</style>
