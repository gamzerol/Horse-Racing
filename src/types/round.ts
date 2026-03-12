import type { Horse } from './horse'

export interface RoundResult {
  position: number
  horseId: number
  horseName: string
  time: number
}

export interface Round {
  id: number
  lap: number
  distance: number
  horses: Horse[]
  results: RoundResult[]
  isCompleted: boolean
}
