<template>
  <BaseModal :show="show" title="Edit Data" :onClose="onClose">
    <div class="space-y-3 text-sm text-gray-700 dark:text-white">
      <label>
        <span>Nama</span>
        <input v-model="model.nama" class="w-full border px-2 py-1 rounded" />
      </label>
      <label>
        <span>Email</span>
        <input v-model="model.email" class="w-full border px-2 py-1 rounded" />
      </label>
      <label>
        <span>Status</span>
        <select v-model="model.status" class="w-full border px-2 py-1 rounded">
          <option value="Aktif">Aktif</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>
      </label>
    </div>
    <template #footer>
      <button @click="onClose" class="px-3 py-1 text-sm bg-gray-100 rounded">Batal</button>
      <button @click="onSave" class="px-3 py-1 text-sm bg-blue-500 text-white rounded">
        Simpan
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'

defineProps<{
  show: boolean
  model: { nama: string; email: string; status: 'Aktif' | 'Tidak Aktif' }
  onClose: () => void
  onSave: () => void
}>()
</script>
