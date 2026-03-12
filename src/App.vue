<template>
  <div class="flex flex-col h-screen overflow-hidden bg-gray-100">
    <AppHeader
      :status="status"
      :is-generated="isGenerated"
      @generate="generateProgram"
      @startPause="startPause"
    />
    <Container>
      <HorseList :horses="allHorses" />
      <RaceTrack :currentRound="currentRound" :raceProgress="raceProgress" :isRunning="isRunning" />
      <div class="flex gap-1 w-[420px] min-w-[420px] overflow-hidden">
        <RaceProgram :rounds="rounds" />
        <RaceResults :completedRounds="completedRounds" />
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore: Could not find declaration file for module 'vuex'.
import { useStore } from 'vuex'
import AppHeader from './components/layout/AppHeader.vue'
import type { RaceState } from './types'
import { computed } from 'vue'
import { ActionTypes } from './store/modules/types'
import Container from './components/layout/Container.vue'
import HorseList from './features/race/components/HorseList.vue'
import RaceTrack from './features/race/components/RaceTrack.vue'
import RaceProgram from './features/race/components/RaceProgram.vue'
import RaceResults from './features/race/components/RaceResults.vue'

const store = useStore<RaceState>()
const allHorses = computed(() => store.state.allHorses)
const rounds = computed(() => store.state.rounds)
const status = computed(() => store.state.status)
const raceProgress = computed(() => store.state.raceProgress)

const currentRound = computed(() => store.getters.currentRound)
const isRunning = computed(() => store.getters.isRunning)
const isGenerated = computed(() => store.getters.isGenerated)
const completedRounds = computed(() => store.getters.completedRounds)

function generateProgram() {
  store.dispatch(ActionTypes.GENERATE_PROGRAM)
}
function startPause() {
  store.dispatch(ActionTypes.START_PAUSE)
}
</script>
