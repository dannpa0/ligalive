// Pure helper functions used across components.

/** Return a readable text color (dark/light) for a given hex background. */
export function readableOn(hex: string): string {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  // perceived luminance
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return l > 0.62 ? '#0f172a' : '#ffffff'
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], { day: '2-digit', month: 'short' })
}

export function formatDateFull(iso: string): string {
  return new Date(iso).toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' })
}

/** Friendly label relative to the dataset's reference date. */
export function relativeDay(iso: string): string {
  const now = new Date('2026-06-25T19:00:00Z')
  const d = new Date(iso)
  const days = Math.round((d.setHours(0, 0, 0, 0) - new Date(now).setHours(0, 0, 0, 0)) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days === -1) return 'Yesterday'
  return formatDateFull(iso)
}
