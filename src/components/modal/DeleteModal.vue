<template>
  <BaseModal :show="show" title="Konfirmasi Hapus" :onClose="onCancel">
    <p class="text-sm text-gray-700 dark:text-white">
      Yakin ingin menghapus <strong>{{ nama }}</strong
      >?
    </p>
    <template #footer>
      <button @click="onCancel" class="px-3 py-1 text-sm bg-gray-100 rounded">Batal</button>
      <button @click="onConfirm" class="px-3 py-1 text-sm bg-red-500 text-white rounded">
        Hapus
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'

defineProps<{
  show: boolean
  nama: string
  onConfirm: () => void
  onCancel: () => void
}>()
</script>
