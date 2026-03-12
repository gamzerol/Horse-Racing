import { describe, it, expect } from 'vitest'
import { calculateRaceResults } from '@/features/race/utils/raceCalculator'
import type { Round } from '@/types'

const mockRound: Round = {
  id: 1,
  lap: 1,
  distance: 1200,
  isCompleted: false,
  results: [],
  horses: [
    { id: 1, name: 'Ada Lovelace', color: '#E74C3C', condition: 90 },
    { id: 2, name: 'Grace Hopper', color: '#3498DB', condition: 50 },
    { id: 3, name: 'Alan Turing', color: '#2ECC71', condition: 30 },
    { id: 4, name: 'Donald Knuth', color: '#F1C40F', condition: 70 },
    { id: 5, name: 'Hedy Lamarr', color: '#9B59B6', condition: 10 },
  ],
}

describe('calculateRaceResults', () => {
  it('Returns results for all horses', () => {
    const results = calculateRaceResults(mockRound)
    expect(results).toHaveLength(mockRound.horses.length)
  })

  it('Positions start from 1 and proceed sequentially', () => {
    const results = calculateRaceResults(mockRound)
    results.forEach((r, i) => {
      expect(r.position).toBe(i + 1)
    })
  })

  it('Each horse appears in the results only once', () => {
    const results = calculateRaceResults(mockRound)
    const ids = results.map((r) => r.horseId)
    expect(new Set(ids).size).toBe(mockRound.horses.length)
  })
})
