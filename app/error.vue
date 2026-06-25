<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
const { init } = useTheme()
onMounted(() => init())
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center bg-surface px-6 text-center text-ink">
    <AppLogo />
    <p class="mt-8 font-display text-6xl font-bold text-brand-500">{{ error?.statusCode || 500 }}</p>
    <h1 class="mt-3 text-xl font-semibold">
      {{ error?.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
    </h1>
    <p class="mt-2 max-w-sm text-sm text-muted">
      {{
        error?.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : 'An unexpected error occurred. Please try again.'
      }}
    </p>
    <button type="button" class="btn btn-primary mt-6" @click="clearError({ redirect: '/' })">
      Back to home
    </button>
  </div>
</template>
