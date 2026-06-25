<script setup lang="ts">
const props = withDefaults(defineProps<{ name: string; size?: number | string }>(), {
  size: 20,
})

// Stroke-based icons (Lucide-style geometry), drawn with currentColor.
const paths: Record<string, string> = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>',
  live: '<circle cx="12" cy="12" r="3"/><path d="M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8M3 21a13 13 0 0 1 0-18M21 3a13 13 0 0 1 0 18"/>',
  trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0Z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 21h6M12 13v4M9.5 21a2.5 2.5 0 0 1 5 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10.5 20a2 2 0 0 0 3 0"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="m12 7 3 2.2-1.1 3.5h-3.8L9 9.2 12 7Z"/>',
  whistle: '<path d="M3 12a5 5 0 0 0 5 5h3l4 3v-6a6 6 0 0 0-6-6H8a5 5 0 0 0-5 4Z"/><circle cx="8" cy="12" r="1"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  stats: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M21 20a5.5 5.5 0 0 0-4-5.3"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4-2v-4Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  sub: '<path d="M16 4h4v4M20 4l-6 6M8 20H4v-4M4 20l6-6"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  pitch: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 12h18M12 4v16"/><circle cx="12" cy="12" r="2.5"/>',
}

const inner = computed(() => paths[props.name] ?? paths.ball)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="inner"
  />
</template>
