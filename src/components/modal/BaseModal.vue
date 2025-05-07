<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    @click.self="onClose"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full">
      <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{{ title }}</h2>
      <slot />
      <div class="mt-6 flex justify-end gap-2" v-if="$slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  onClose: () => void
}>()
</script>
