<template>
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-gray-100 sticky top-0 z-10">
        <th
          v-for="col in columns"
          :key="col.key"
          class="py-1.5 px-2 text-center text-[11px] font-semibold text-gray-500 border-b border-gray-300"
          :style="col.width ? { width: col.width } : {}"
        >
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, i) in rows"
        :key="i"
        class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100"
      >
        <slot :row="row" :index="i" />
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  columns: { key: string; label: string; width?: string }[]
  rows: unknown[]
}>()
</script>
