<script setup lang="ts">
const { init } = useTheme()
onMounted(() => init())
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-surface text-ink">
    <AppHeader />
    <main class="flex-1 w-full pb-24 md:pb-0">
      <slot />
    </main>
    <AppFooter />
    <MobileBottomNav />
  </div>
</template>
