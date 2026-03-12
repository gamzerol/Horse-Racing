<template>
  <div
    class="relative flex-1 border-b border-dashed border-gray-400"
    :class="index % 2 === 0 ? 'bg-[#d8d8d8]' : 'bg-[#c8c8c8]'"
  >
    <HorseIcon :left="horseLeft" :color="horse.color" :isRunning="isRunning" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HorseIcon from '../../../components/shared/HorseIcon.vue'
import type { Horse } from '../../../types'

const props = defineProps<{
  horse: Horse
  index: number
  progress: number
  isRunning: boolean
}>()

const horseLeft = computed(() => `${Math.min(props.progress, 91)}%`)
</script>
