// Global dark-mode state. Dark is the default; choice persists in localStorage.
const isDark = ref(true)

export function useTheme() {
  function apply() {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }

  function init() {
    if (!import.meta.client) return
    const stored = localStorage.getItem('ligalive-theme')
    isDark.value = stored ? stored === 'dark' : true
    apply()
  }

  function toggle() {
    isDark.value = !isDark.value
    if (import.meta.client) localStorage.setItem('ligalive-theme', isDark.value ? 'dark' : 'light')
    apply()
  }

  return { isDark, init, toggle }
}
