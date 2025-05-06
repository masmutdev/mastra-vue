<template>
  <div
    :class="[
      'min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-all duration-300 ease-in-out',
      layoutPadding,
    ]"
  >
    <!-- Sidebar -->
    <SidebarDesktop ref="sidebarRef" />

    <!-- Main -->
    <div class="flex flex-col flex-1 w-full">
      <HeaderDesktop @toggle-sidebar="toggleSidebar" />

      <main class="flex-1 p-6 w-full">
        <router-view />
      </main>

      <footer
        class="h-12 bg-white dark:bg-gray-800 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400"
      >
        © 2025 Masmut Corp. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SidebarDesktop from './SidebarDesktop.vue'
import HeaderDesktop from './HeaderDesktop.vue'

const sidebarRef = ref<InstanceType<typeof SidebarDesktop> | null>(null)

const toggleSidebar = () => {
  sidebarRef.value?.toggleSidebar()
}

const layoutPadding = computed(() => {
  return sidebarRef.value?.isCollapsed ? 'pl-20' : 'pl-64'
})
</script>
