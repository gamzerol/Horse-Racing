import type { RaceState } from '@/types'

export const state: RaceState = {
  allHorses: [],
  rounds: [],
  currentRoundIndex: 0,
  status: 'idle',
  raceProgress: {},
}
