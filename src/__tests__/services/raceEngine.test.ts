import { describe, it, expect } from 'vitest'
import { raceEngine } from '@/features/race/services/raceEngine'
import { TOTAL_HORSES } from '@/constants/horses'
import {
  ROUND_DISTANCES,
  RACE_DURATION_BASE,
  RACE_DURATION_STEP,
  TICK_INTERVAL,
} from '@/constants/raceRound'

describe('raceEngine', () => {
  describe('createHorses', () => {
    it(`Create ${TOTAL_HORSES} horses`, () => {
      expect(raceEngine.createHorses()).toHaveLength(TOTAL_HORSES)
    })
  })

  describe('createRounds', () => {
    it(`Create ${ROUND_DISTANCES.length} types`, () => {
      const horses = raceEngine.createHorses()
      expect(raceEngine.createRounds(horses)).toHaveLength(ROUND_DISTANCES.length)
    })
  })

  describe('calculateResults', () => {
    it('Returns the correct number of results per round', () => {
      const horses = raceEngine.createHorses().slice(0, 10)
      const round = { id: 1, lap: 1, distance: 1200, horses, results: [], isCompleted: false }
      expect(raceEngine.calculateResults(round)).toHaveLength(10)
    })
  })
})
