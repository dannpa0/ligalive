<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="grid place-items-center w-9 h-9 rounded-lg text-muted hover:text-ink hover:bg-elevated transition-colors"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <AppIcon :name="isDark ? 'sun' : 'moon'" :size="19" />
  </button>
</template>
