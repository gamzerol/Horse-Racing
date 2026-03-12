<template>
  <div class="flex flex-col flex-1 min-w-0 px-2">
    <div class="flex flex-1 border-2 border-gray-400 overflow-hidden rounded-t bg-[#d0d0d0]">
      <!-- Lane number sidebar -->
      <div class="flex flex-col w-9 min-w-[36px]">
        <div
          v-for="(horse, i) in horses"
          :key="horse.id"
          class="flex flex-1 items-center justify-center text-white text-xs font-bold border-b border-white/20"
          :style="{ backgroundColor: laneColor(i) }"
        >
          {{ i + 1 }}
        </div>
      </div>

      <!-- Lanes — key: roundId+horseId → tur değişince DOM yeniden oluşur -->
      <div class="relative flex flex-col flex-1">
        <RaceLane
          v-for="(horse, i) in horses"
          :key="`${currentRound?.id}-${horse.id}`"
          :horse="horse"
          :index="i"
          :progress="raceProgress[horse.id] ?? 0"
          :isRunning="isRunning"
        />
        <div class="finish-line absolute right-0 top-0 bottom-0 w-1 z-10"></div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="flex items-center justify-between px-2 py-1 bg-gray-50 border border-t-0 border-gray-300 rounded-b min-h-[26px]"
    >
      <span class="text-red-600 font-bold text-xs">
        <template v-if="currentRound"
          >{{ currentRound.lap }}.st Lap {{ currentRound.distance }}m</template
        >
        <template v-else>Waiting for race...</template>
      </span>
      <span class="text-red-600 font-bold text-xs">FINISH</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RaceLane from './RaceLane.vue'
import type { Round } from '../../../types'
import { LANE_COLORS } from '../../../constants/raceRound'

const props = defineProps<{
  currentRound: Round | null
  raceProgress: Record<number, number>
  isRunning: boolean
}>()

const horses = computed(() => props.currentRound?.horses ?? [])

function laneColor(index: number): string {
  return LANE_COLORS[index % LANE_COLORS.length] ?? '#888888'
}
</script>
