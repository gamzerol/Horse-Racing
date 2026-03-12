import { describe, it, expect, beforeEach } from 'vitest'
import { mutations } from '@/store/modules/mutations'
import { MutationTypes } from '@/store/modules/types'
import type { RaceState } from '@/types'

function makeState(): RaceState {
  return {
    allHorses: [],
    rounds: [],
    currentRoundIndex: 0,
    status: 'idle',
    raceProgress: {},
  }
}

const horses = [
  { id: 1, name: 'Ada', color: '#E74C3C', condition: 80 },
  { id: 2, name: 'Grace', color: '#3498DB', condition: 60 },
]

const rounds = [
  { id: 1, lap: 1, distance: 1200, horses, results: [], isCompleted: false },
  { id: 2, lap: 2, distance: 1400, horses, results: [], isCompleted: false },
]

describe('mutations', () => {
  let state: RaceState
  beforeEach(() => {
    state = makeState()
  })

  it('SET_HORSES — writes horses to state', () => {
    mutations[MutationTypes.SET_HORSES](state, horses)
    expect(state.allHorses).toEqual(horses)
  })

  it('SET_ROUNDS — writes rounds to state', () => {
    mutations[MutationTypes.SET_ROUNDS](state, rounds)
    expect(state.rounds).toEqual(rounds)
  })

  it('SET_STATUS — updates status', () => {
    mutations[MutationTypes.SET_STATUS](state, 'running')
    expect(state.status).toBe('running')
  })

  it('SET_CURRENT_ROUND_INDEX — updates the index', () => {
    mutations[MutationTypes.SET_CURRENT_ROUND_INDEX](state, 3)
    expect(state.currentRoundIndex).toBe(3)
  })

  it('SET_RACE_PROGRESS — assigns progress as a new object', () => {
    const progress = { 1: 50, 2: 75 }
    mutations[MutationTypes.SET_RACE_PROGRESS](state, progress)
    expect(state.raceProgress).toEqual(progress)
    expect(state.raceProgress).not.toBe(progress)
  })

  it('UPDATE_HORSE_PROGRESS — updates a single horse progress', () => {
    state.raceProgress = { 1: 20, 2: 30 }
    mutations[MutationTypes.UPDATE_HORSE_PROGRESS](state, { horseId: 1, progress: 55 })
    expect(state.raceProgress[1]).toBe(55)
    expect(state.raceProgress[2]).toBe(30)
  })

  it('UPDATE_HORSE_PROGRESS — returns a new object for reactivity', () => {
    state.raceProgress = { 1: 0 }
    const before = state.raceProgress
    mutations[MutationTypes.UPDATE_HORSE_PROGRESS](state, { horseId: 1, progress: 10 })
    expect(state.raceProgress).not.toBe(before)
  })

  it('COMPLETE_ROUND — marks round as completed', () => {
    const results = [{ position: 1, horseId: 1, horseName: 'Ada', time: 120 }]
    state.rounds = rounds.map((r) => ({ ...r }))
    mutations[MutationTypes.COMPLETE_ROUND](state, { roundIndex: 0, results })
    expect(state.rounds[0].isCompleted).toBe(true)
    expect(state.rounds[0].results).toEqual(results)
  })

  it('COMPLETE_ROUND — does not change state on invalid index', () => {
    state.rounds = rounds.map((r) => ({ ...r }))
    mutations[MutationTypes.COMPLETE_ROUND](state, { roundIndex: 99, results: [] })
    expect(state.rounds[0].isCompleted).toBe(false)
  })

  it('ADVANCE_TO_NEXT_ROUND — atomically updates index and progress', () => {
    state.currentRoundIndex = 0
    state.raceProgress = { 1: 91, 2: 85 }
    const initialProgress = { 3: 0, 4: 0 }
    mutations[MutationTypes.ADVANCE_TO_NEXT_ROUND](state, { nextIndex: 1, initialProgress })
    expect(state.currentRoundIndex).toBe(1)
    expect(state.raceProgress).toEqual(initialProgress)
    expect(state.raceProgress).not.toBe(initialProgress)
  })
})
