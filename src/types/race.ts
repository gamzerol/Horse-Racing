import type { Horse } from './horse'
import type { Round } from './round'

export type GameStatus = 'idle' | 'generated' | 'running' | 'paused' | 'finished'
export interface RaceState {
  allHorses: Horse[]
  rounds: Round[]
  currentRoundIndex: number
  status: GameStatus
  raceProgress: Record<number, number>
}
