<template>
  <button
    class="px-5 py-2 text-xs font-bold rounded tracking-wide transition-all duration-150 hover:brightness-110 hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100"
    :class="variantClass"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'success' | 'white'
  disabled?: boolean
}>()

defineEmits<{ click: [] }>()

const variantClass = computed(() => ({
  'bg-white text-gray-800': props.variant === 'white' || !props.variant,
  'bg-red-500 text-white': props.variant === 'primary',
  'bg-green-400 text-white': props.variant === 'success',
}))
</script>
