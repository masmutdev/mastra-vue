<template>
  <!-- Breadcrumb -->
  <nav class="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
    <RouterLink to="/dashboard" class="text-blue-600 hover:underline dark:text-blue-400"
      >Dashboard</RouterLink
    >
    <span>/</span>
    <span class="text-gray-700 dark:text-gray-200">Data Pelanggan</span>
  </nav>

  <!-- Judul -->
  <h2 class="text-2xl font-semibold text-blue-600 dark:text-blue-400">Data Pelanggan</h2>
  <p class="text-gray-700 dark:text-gray-300 mb-6">Ini halaman data pelanggan Masmut.</p>

  <!-- Card Table -->
  <div class="bg-white dark:bg-gray-800 shadow rounded">
    <!-- Card Header -->
    <div
      class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700"
    >
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Data Pelanggan</h3>

      <div class="relative">
        <button
          @click="showMenu = !showMenu"
          class="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          <IconMenu2 class="w-5 h-5" />
          Menu
        </button>

        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-md z-10"
        >
          <ul
            class="text-sm text-gray-700 dark:text-gray-200 divide-y divide-gray-100 dark:divide-gray-600"
          >
            <li>
              <button
                class="cursor-pointer w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <IconPlus class="w-4 h-4" /> Tambah Data
              </button>
            </li>
            <li>
              <button
                class="cursor-pointer w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <IconEdit class="w-4 h-4" /> Bulk Edit
              </button>
            </li>
            <li>
              <button
                class="cursor-pointer w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <IconTrash class="w-4 h-4" /> Bulk Delete
              </button>
            </li>
            <li>
              <button
                class="cursor-pointer w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <IconPdf class="w-4 h-4" /> Export PDF
              </button>
            </li>
            <li>
              <button
                class="cursor-pointer w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <IconFileSpreadsheet class="w-4 h-4" /> Export Excel
              </button>
            </li>
            <li>
              <button
                class="cursor-pointer w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <IconEraser class="w-4 h-4" /> Bersihkan
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Placeholder Table -->
    <div class="p-4 text-center text-gray-500 dark:text-gray-400">
      <DatatablesPelanggan />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconPdf,
  IconFileSpreadsheet,
  IconEraser,
  IconMenu2,
} from '@tabler/icons-vue'
import DatatablesPelanggan from '@/components/tables/DatatablesPelanggan.vue'

const showMenu = ref(false)
</script>
