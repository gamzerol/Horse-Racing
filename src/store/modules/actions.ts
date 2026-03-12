import type { RaceState, RoundResult } from '@/types'
// @ts-ignore: Could not find declaration file for module 'vuex'.
import type { ActionContext } from 'vuex'
import { ActionTypes, MutationTypes } from './types'
import { raceEngine } from '@/features/race/services/raceEngine'

let raceTimer: ReturnType<typeof setInterval> | null = null

type Ctx = ActionContext<RaceState, RaceState>

function clearTimer(): void {
  if (raceTimer) {
    clearInterval(raceTimer)
    raceTimer = null
  }
}

export const actions = {
  async [ActionTypes.GENERATE_PROGRAM]({ commit }: Ctx): Promise<void> {
    clearTimer()
    const horses = raceEngine.createHorses()
    const rounds = raceEngine.createRounds(horses)
    commit(MutationTypes.SET_HORSES, horses)
    commit(MutationTypes.SET_ROUNDS, rounds)
    commit(MutationTypes.SET_CURRENT_ROUND_INDEX, 0)
    commit(MutationTypes.SET_RACE_PROGRESS, {})
    commit(MutationTypes.SET_STATUS, 'generated')
  },

  [ActionTypes.START_PAUSE]({ state, commit, dispatch }: Ctx): void {
    if (state.status === 'idle') return

    if (state.status === 'running') {
      clearTimer()
      commit(MutationTypes.SET_STATUS, 'paused')
      return
    }

    if (state.status === 'generated' || state.status === 'paused') {
      commit(MutationTypes.SET_STATUS, 'running')
      dispatch(ActionTypes.RUN_CURRENT_ROUND)
    }
  },

  [ActionTypes.RUN_CURRENT_ROUND](ctx: Ctx): void {
    const { commit, dispatch } = ctx

    const roundIndex = ctx.state.currentRoundIndex
    const round = ctx.state.rounds[roundIndex]
    if (!round) return

    const initial: Record<number, number> = {}
    round.horses.forEach((h: any) => {
      initial[h.id] = 0
    })
    commit(MutationTypes.SET_RACE_PROGRESS, initial)

    const results = raceEngine.calculateResults(round)
    const duration = raceEngine.getRoundDuration(round.distance)
    const startTime = Date.now()

    raceTimer = setInterval(() => {
      if (ctx.state.status !== 'running') return
      if (ctx.state.currentRoundIndex !== roundIndex) {
        clearTimer()
        return
      }

      const fraction = Math.min((Date.now() - startTime) / duration, 1)

      results.forEach((result, idx) => {
        const speedFactor = 1 - (idx / results.length) * 0.15
        const progress = Math.min(fraction * speedFactor * 100, 100)
        commit(MutationTypes.UPDATE_HORSE_PROGRESS, {
          horseId: result.horseId,
          progress,
        })
      })

      if (fraction >= 1) {
        clearTimer()
        dispatch(ActionTypes.FINISH_ROUND, { results, roundIndex })
      }
    }, raceEngine.tickInterval)
  },

  [ActionTypes.FINISH_ROUND](
    ctx: Ctx,
    payload: { results: RoundResult[]; roundIndex: number },
  ): void {
    const { commit, dispatch } = ctx
    const { results, roundIndex } = payload

    commit(MutationTypes.COMPLETE_ROUND, { roundIndex, results })

    const hasNext = roundIndex < ctx.state.rounds.length - 1

    if (hasNext) {
      setTimeout(() => {
        if (ctx.state.status !== 'running') return

        const nextIndex = roundIndex + 1
        const nextRound = ctx.state.rounds[nextIndex]
        if (!nextRound) return

        const initialProgress: Record<number, number> = {}
        nextRound.horses.forEach((h: any) => {
          initialProgress[h.id] = 0
        })

        commit(MutationTypes.ADVANCE_TO_NEXT_ROUND, {
          nextIndex,
          initialProgress,
        })

        dispatch(ActionTypes.RUN_CURRENT_ROUND)
      }, 1500)
    } else {
      commit(MutationTypes.SET_STATUS, 'finished')
    }
  },
}
