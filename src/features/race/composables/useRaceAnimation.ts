import { LANE_COLORS } from '@/constants/raceRound'
import type { Horse } from '@/types'
import { computed } from 'vue'

export function useRaceAnimation(raceProgress: Record<number, number>, isRunning: boolean) {
  function horseLeft(horseId: number): string {
    return `${Math.min(raceProgress[horseId] ?? 0, 91)}%`
  }

  function laneColor(index: number): string {
    if (LANE_COLORS.length === 0) return 'brown'
    return LANE_COLORS[index % LANE_COLORS.length]!
  }

  function horseStyle(horse: Horse): Record<string, string> {
    return {
      left: horseLeft(horse.id),
      color: horse.color,
      transition: 'left 0.05s linear',
    }
  }

  const gallopClass = computed(() => (isRunning ? 'horse-gallop' : ''))

  return { horseLeft, laneColor, horseStyle, gallopClass }
}
