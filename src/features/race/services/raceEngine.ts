import { RACE_DURATION_BASE, RACE_DURATION_STEP, TICK_INTERVAL } from '@/constants/raceRound'
import type { Horse, Round, RoundResult } from '@/types'
import { generateHorses } from '../utils/generateHorse'
import { generateRounds } from '../utils/generateRound'
import { calculateRaceResults } from '../utils/raceCalculator'

export const raceEngine = {
  tickInterval: TICK_INTERVAL,

  createHorses(): Horse[] {
    return generateHorses()
  },

  createRounds(horses: Horse[]): Round[] {
    return generateRounds(horses)
  },

  calculateResults(round: Round): RoundResult[] {
    return calculateRaceResults(round)
  },

  getRoundDuration(distance: number): number {
    return RACE_DURATION_BASE + (distance - 1200) * RACE_DURATION_STEP
  },
}
