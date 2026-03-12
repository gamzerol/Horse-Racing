import { HORSES_PER_ROUND } from '@/constants/horses'
import { HORSES_PER_ROUND as HRS, ROUND_DISTANCES } from '@/constants/raceRound'
import type { Horse, Round } from '@/types'
const COUNT = HORSES_PER_ROUND ?? HRS

export function selectRandomHorses(horses: Horse[], count = COUNT): Horse[] {
  return [...horses].sort(() => Math.random() - 0.5).slice(0, count)
}

export function generateRounds(horses: Horse[]): Round[] {
  return ROUND_DISTANCES.map((distance, i) => ({
    id: i + 1,
    lap: i + 1,
    distance,
    horses: selectRandomHorses(horses),
    results: [],
    isCompleted: false,
  }))
}
