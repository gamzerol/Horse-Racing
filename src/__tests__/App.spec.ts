import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// @ts-ignore: vuex types resolution issue with package "exports"
import { createStore } from 'vuex'
import App from '@/App.vue'
import { state } from '@/store/modules/state'
import { getters } from '@/store/modules/getters'
import { mutations } from '@/store/modules/mutations'
import { actions } from '@/store/modules/actions'

function createTestStore() {
  return createStore({
    state: { ...state },
    getters,
    mutations,
    actions,
  })
}

describe('App', () => {
  it('mounts renders properly', () => {
    const store = createTestStore()
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
