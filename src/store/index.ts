// @ts-ignore: Could not find declaration file for module 'vuex'.
import { createStore } from 'vuex'
import type { RaceState } from '../types'
import { state } from './modules/state'
import { getters } from './modules/getters'
import { mutations } from './modules/mutations'
import { actions } from './modules/actions'

export default createStore<RaceState>({
  state,
  getters,
  mutations,
  actions,
})
