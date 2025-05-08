<template>
  <BaseModal :show="show" title="Ubah Status Massal" :onClose="onClose">
    <p class="text-sm text-gray-700 dark:text-white mb-4">
      Ubah status dari {{ count }} data terpilih menjadi:
    </p>
    <select v-model="newStatus" class="w-full border px-2 py-1 rounded text-sm">
      <option value="Aktif">Aktif</option>
      <option value="Tidak Aktif">Tidak Aktif</option>
    </select>
    <template #footer>
      <button @click="onClose" class="cursor-pointer px-3 py-1 text-sm bg-gray-100 rounded">
        Batal
      </button>
      <button
        @click="() => onSave(newStatus)"
        class="cursor-pointer px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Simpan
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps<{
  show: boolean
  count: number
  onClose: () => void
  onSave: (status: 'Aktif' | 'Tidak Aktif') => void
}>()

const newStatus = ref<'Aktif' | 'Tidak Aktif'>('Aktif')

watch(
  () => props.show,
  (val) => {
    if (val) newStatus.value = 'Aktif'
  },
)
</script>
