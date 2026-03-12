<template>
  <header class="flex items-center justify-between bg-mauve-700 px-4 py-2.5 shadow-md shrink-0">
    <div class="text-xl font-bold text-white tracking-wide">🐎 Horse Racing</div>
    <div class="flex gap-2.5">
      <MainButton variant="white" @click="$emit('generate')">GENERATE PROGRAM</MainButton>
      <MainButton variant="success" :disabled="!canStart" @click="$emit('startPause')">
        {{ label }}
      </MainButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { GameStatus } from '@/types/race'
import MainButton from '../shared/MainButton.vue'
import { computed } from 'vue'

const props = defineProps<{
  status: GameStatus
  isGenerated: boolean
}>()

defineEmits<{ generate: []; startPause: [] }>()
const canStart = computed(() => props.isGenerated && props.status !== 'finished')

const label = computed(() => {
  if (props.status === 'running') return 'PAUSE'
  if (props.status === 'finished') return 'FINISHED'
  if (props.status === 'paused') return 'RESUME'
  return 'START / PAUSE'
})
</script>
