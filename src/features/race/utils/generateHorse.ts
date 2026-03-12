import { HORSE_COLORS, HORSE_NAMES, TOTAL_HORSES } from '@/constants/horses'
import type { Horse } from '@/types'

export function generateHorses(): Horse[] {
  return HORSE_NAMES.slice(0, TOTAL_HORSES).map((name, i) => ({
    id: i + 1,
    name,
    color: HORSE_COLORS[i] ?? 'brown',
    condition: Math.floor(Math.random() * 100) + 1,
  }))
}
