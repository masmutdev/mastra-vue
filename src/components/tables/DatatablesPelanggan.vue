<template>
  <div class="space-y-4">
    <!-- Controls -->
    <div class="flex flex-col sm:flex-row justify-start gap-4">
      <select v-model="perPage" class="px-3 py-2 border dark:border-gray-600 rounded text-sm">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama/email..."
        class="w-full sm:w-1/3 px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
      />
    </div>

    <!-- Table -->
    <table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
      <thead class="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th class="px-4 py-2">
            <input type="checkbox" :checked="allVisibleSelected" @change="toggleSelectAll" />
          </th>
          <th class="px-4 py-2">No</th>
          <th class="px-4 py-2">Nama</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columnCount" class="text-center px-4 py-3">Memuat data...</td>
        </tr>
        <tr v-else-if="filtered.length === 0">
          <td :colspan="columnCount" class="text-center px-4 py-3">Tidak Ada Data</td>
        </tr>
        <tr v-else v-for="(p, i) in paginated" :key="p.id" class="border-b dark:border-gray-600">
          <td class="px-4 py-2">
            <input type="checkbox" :value="p.id" v-model="selected" />
          </td>
          <td class="px-4 py-2">{{ (page - 1) * perPage + i + 1 }}</td>
          <td class="px-4 py-2">{{ p.nama }}</td>
          <td class="px-4 py-2">{{ p.email }}</td>
          <td class="px-4 py-2">
            <span
              :class="[
                'px-2 py-1 rounded text-xs font-medium',
                p.status === 'Aktif'
                  ? 'bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400',
              ]"
            >
              {{ p.status }}
            </span>
          </td>
          <td class="px-4 py-2 flex gap-2">
            <button @click="handleEdit(p)" class="text-blue-600 hover:underline text-xs">
              Edit
            </button>
            <button @click="handleDelete(p)" class="text-red-600 hover:underline text-xs">
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Menampilkan {{ paginated.length }} data dari {{ filtered.length }} data
      </div>
      <div class="flex justify-center items-center gap-2">
        <button
          :disabled="page === 1"
          @click="page--"
          class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Prev
        </button>
        <span class="text-sm">Page {{ page }} / {{ totalPage }}</span>
        <button
          :disabled="page === totalPage"
          @click="page++"
          class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Edit Data Pelanggan
        </h2>
        <div class="space-y-2 text-sm text-gray-700 dark:text-gray-200">
          <div><strong>Nama:</strong> {{ selectedData?.nama }}</div>
          <div><strong>Email:</strong> {{ selectedData?.email }}</div>
          <div><strong>Status:</strong> {{ selectedData?.status }}</div>
        </div>
        <div class="mt-6 flex justify-end gap-2">
          <button
            class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            @click="closeModal"
          >
            Tutup
          </button>
          <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePelanggan } from '@/composables/usePelanggan'

const {
  pelanggan,
  search,
  page,
  perPage,
  loading,
  selected,
  showModal,
  selectedData,
  columnCount,
  filtered,
  paginated,
  totalPage,
  allVisibleSelected,
  toggleSelectAll,
  handleEdit,
  handleDelete,
  closeModal,
} = usePelanggan()
</script>
