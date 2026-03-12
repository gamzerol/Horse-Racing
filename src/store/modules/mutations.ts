import type { GameStatus, Horse, RaceState, Round, RoundResult } from '@/types'
import { MutationTypes } from './types'

export const mutations = {
  [MutationTypes.SET_HORSES](state: RaceState, horses: Horse[]) {
    state.allHorses = horses
  },
  [MutationTypes.SET_ROUNDS](state: RaceState, rounds: Round[]) {
    state.rounds = rounds
  },

  [MutationTypes.SET_STATUS](state: RaceState, status: GameStatus) {
    state.status = status
  },

  [MutationTypes.SET_CURRENT_ROUND_INDEX](state: RaceState, index: number) {
    state.currentRoundIndex = index
  },

  [MutationTypes.SET_RACE_PROGRESS](state: RaceState, progress: Record<number, number>) {
    state.raceProgress = { ...progress }
  },

  [MutationTypes.UPDATE_HORSE_PROGRESS](
    state: RaceState,
    payload: { horseId: number; progress: number },
  ) {
    state.raceProgress = {
      ...state.raceProgress,
      [payload.horseId]: payload.progress,
    }
  },

  [MutationTypes.COMPLETE_ROUND](
    state: RaceState,
    payload: { roundIndex: number; results: RoundResult[] },
  ) {
    const round = state.rounds[payload.roundIndex]
    if (!round) return
    round.results = payload.results
    round.isCompleted = true
  },

  [MutationTypes.ADVANCE_TO_NEXT_ROUND](
    state: RaceState,
    payload: { nextIndex: number; initialProgress: Record<number, number> },
  ) {
    state.currentRoundIndex = payload.nextIndex
    state.raceProgress = { ...payload.initialProgress }
  },
}
