import { describe, it, expect } from 'vitest'
import { generateRounds, selectRandomHorses } from '@/features/race/utils/generateRound'
import { generateHorses } from '@/features/race/utils/generateHorse'
import { ROUND_DISTANCES } from '@/constants/raceRound'

describe('selectRandomHorses', () => {
  it('It returns the desired number of horses', () => {
    const horses = generateHorses()
    const selected = selectRandomHorses(horses, 10)
    expect(selected).toHaveLength(10)
  })

  it('Selected horses are unique.', () => {
    const horses = generateHorses()
    const selected = selectRandomHorses(horses, 10)
    const ids = selected.map((h) => h.id)
    expect(new Set(ids).size).toBe(10)
  })
})

describe('generateRounds', () => {
  it('It create 6 turns', () => {
    const rounds = generateRounds(generateHorses())
    expect(rounds).toHaveLength(ROUND_DISTANCES.length)
  })

  it('Distance of each lap comes from ROUND_DISTANCES', () => {
    const rounds = generateRounds(generateHorses())
    rounds.forEach((round, i) => {
      expect(round.distance).toBe(ROUND_DISTANCES[i])
    })
  })

  it('Each round has a unique ID', () => {
    const rounds = generateRounds(generateHorses())
    const ids = rounds.map((r) => r.id)
    expect(new Set(ids).size).toBe(ROUND_DISTANCES.length)
  })
})
