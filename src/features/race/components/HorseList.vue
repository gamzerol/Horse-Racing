<template>
  <div
    class="flex flex-col w-[260px] min-w-[260px] flex-shrink-0 bg-white border border-gray-300 rounded overflow-hidden"
  >
    <div
      class="bg-yellow-400 text-gray-800 text-sm font-bold text-center py-2 px-3 border-b-2 border-yellow-500"
    >
      Horse List (1-20)
    </div>

    <div class="custom-scroll overflow-y-auto flex-1 max-h-[calc(100vh-64px)]">
      <MainTable :columns="columns" :rows="horses">
        <template #default="{ row: horse }">
          <td class="py-1 px-2 text-center text-[11px] text-gray-700">
            {{ (horse as Horse).name }}
          </td>
          <td class="py-1 px-2 text-center">
            <span
              class="inline-flex items-center justify-center w-8 h-5 rounded text-[10px] font-bold text-white"
              :style="conditionStyle((horse as Horse).condition)"
              >{{ (horse as Horse).condition }}</span
            >
          </td>
          <td class="py-1 px-2 text-center">
            <span
              class="inline-block w-2.5 h-2.5 rounded-full border border-black/20 align-middle mr-1"
              :style="{ backgroundColor: (horse as Horse).color }"
            ></span>
            <span class="text-[11px] align-middle text-gray-600">{{
              colorLabel((horse as Horse).color)
            }}</span>
          </td>
        </template>
      </MainTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainTable from '@/components/shared/MainTable.vue'
import type { Horse } from '../../../types'
import { COLOR_LABELS } from '../../../constants/horses'

defineProps<{ horses: Horse[] }>()

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'condition', label: 'Condition', width: '80px' },
  { key: 'color', label: 'Color' },
]

function colorLabel(hex: string): string {
  return COLOR_LABELS[hex] ?? hex
}

function conditionStyle(condition: number) {
  if (condition >= 70) return { background: '#2ECC71' }
  if (condition >= 40) return { background: '#E67E22' }
  return { background: '#E74C3C' }
}
</script>
