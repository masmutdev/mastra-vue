<template>
  <header class="h-16 bg-white dark:bg-gray-800 shadow flex items-center px-6 justify-between">
    <!-- Kiri: Toggle Sidebar + Search -->
    <div class="flex items-center gap-4">
      <button @click="$emit('toggle-sidebar')">
        <IconMenu2 class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
      </button>

      <div class="relative">
        <IconSearch class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari sesuatu..."
          class="pl-8 pr-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white rounded w-72 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </div>

    <!-- Kanan: Notif & User -->
    <HeaderComponents />
  </header>
</template>

<script setup lang="ts">
import { IconSearch, IconMenu2 } from '@tabler/icons-vue'

import HeaderComponents from '@/components/layouts/HeaderComponents.vue'
</script>
