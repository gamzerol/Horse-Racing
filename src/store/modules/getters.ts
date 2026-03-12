import type { RaceState, Round } from '@/types'

export const getters = {
  currentRound(state: RaceState): Round | null {
    return state.rounds[state.currentRoundIndex] ?? null
  },

  isRunning(state: RaceState): boolean {
    return state.status === 'running'
  },

  isGenerated(state: RaceState): boolean {
    return ['generated', 'running', 'paused', 'finished'].includes(state.status)
  },

  completedRounds(state: RaceState): Round[] {
    return state.rounds.filter((r) => r.isCompleted)
  },
}
