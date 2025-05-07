<template>
  <BaseModal :show="show" title="Hapus Data Massal" :onClose="onCancel">
    <p class="text-sm text-gray-700 dark:text-white mb-4">
      Yakin ingin menghapus <strong>{{ count }}</strong> data terpilih?
    </p>
    <template #footer>
      <button @click="onCancel" class="px-3 py-1 text-sm bg-gray-100 rounded">Batal</button>
      <button
        @click="onConfirm"
        class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      >
        Hapus
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'

defineProps<{
  show: boolean
  count: number
  onCancel: () => void
  onConfirm: () => void
}>()
</script>
