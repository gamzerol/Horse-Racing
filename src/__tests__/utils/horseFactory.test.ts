import { describe, it, expect } from 'vitest'
import { generateHorses } from '@/features/race/utils/generateHorse'
import { TOTAL_HORSES, HORSE_NAMES, HORSE_COLORS } from '@/constants/horses'

describe('Horse Factory', () => {
  it('It produces exactly 20 horses.', () => {
    const horses = generateHorses()
    expect(horses).toHaveLength(TOTAL_HORSES)
  })

  it('Each horse has a unique ID', () => {
    const horses = generateHorses()
    const ids = horses.map((h) => h.id)
    expect(new Set(ids).size).toBe(TOTAL_HORSES)
  })
  it('IDs start from 1', () => {
    const horses = generateHorses()
    expect(horses[0].id).toBe(1)
    expect(horses[TOTAL_HORSES - 1].id).toBe(TOTAL_HORSES)
  })
  it('Horse names come from the HORSE NAMES list', () => {
    const horses = generateHorses()
    horses.forEach((horse, i) => {
      expect(horse.name).toBe(HORSE_NAMES[i])
    })
  })
  it('Horse colors come from the HORSE COLORS list.', () => {
    const horses = generateHorses()
    horses.forEach((horse, i) => {
      expect(horse.color).toBe(HORSE_COLORS[i])
    })
  })
  it('Condition value is between 1 and 100', () => {
    const horses = generateHorses()
    horses.forEach((horse) => {
      expect(horse.condition).toBeGreaterThanOrEqual(1)
      expect(horse.condition).toBeLessThanOrEqual(100)
    })
  })
})
