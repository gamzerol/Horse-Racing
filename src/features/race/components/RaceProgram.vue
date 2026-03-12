<template>
  <div class="flex flex-col flex-1 min-w-0 border border-gray-300 rounded overflow-hidden bg-white">
    <div class="bg-blue-500 text-white text-sm font-bold text-center py-2 flex-shrink-0">
      Program
    </div>

    <div class="custom-scroll overflow-y-auto flex-1 max-h-[calc(100vh-64px)]">
      <template v-if="rounds.length > 0">
        <div v-for="round in rounds" :key="round.id" class="mb-px">
          <div class="bg-orange-500 text-white text-[11px] font-bold text-center py-1 px-2">
            {{ round.lap }}ST Lap - {{ round.distance }}m
          </div>
          <MainTable :columns="columns" :rows="round.horses">
            <template #default="{ row: horse, index }">
              <td class="py-0.5 px-2 text-center text-[11px] text-gray-500">{{ index + 1 }}</td>
              <td class="py-0.5 px-2 text-center text-[11px] text-gray-700">
                {{ (horse as Horse).name }}
              </td>
            </template>
          </MainTable>
        </div>
      </template>
      <div v-else class="flex items-center justify-center h-20 text-[11px] text-gray-400">
        Generate program to see schedule
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainTable from '@/components/shared/MainTable.vue'
import type { Horse, Round } from '../../../types'

defineProps<{ rounds: Round[] }>()

const columns = [
  { key: 'pos', label: 'Position', width: '64px' },
  { key: 'name', label: 'Name' },
]
</script>
