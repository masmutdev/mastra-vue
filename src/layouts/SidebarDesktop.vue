<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-screen overflow-y-auto z-20 transition-all duration-300 shadow-sm flex flex-col justify-between p-4',
      isCollapsed ? 'w-20' : 'w-64',
      'bg-white dark:bg-gray-800',
    ]"
  >
    <!-- Top -->
    <div>
      <!-- Logo -->
      <div class="flex items-center gap-2 mb-8 px-2">
        <img src="@/assets/img/logo.png" alt="Logo" class="h-6 w-6" />
        <span v-if="!isCollapsed" class="font-bold text-xl text-gray-800 dark:text-white">
          Masmut Dev
        </span>
      </div>

      <!-- Menu -->
      <nav class="space-y-2">
        <template v-for="item in menu" :key="item.label">
          <RouterLink v-if="!item.children" :to="item.to!" :class="getLinkClass(item.to)">
            <component :is="item.icon" class="w-5 h-5" />
            <span v-if="!isCollapsed">{{ item.label }}</span>
          </RouterLink>

          <div v-else>
            <div
              @click="toggleSubmenu(item.label)"
              :class="getParentLinkClass(item)"
              class="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg font-medium"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span
                v-if="!isCollapsed"
                class="flex justify-between items-center w-full dark:text-white dark:hover:text-gray-800"
              >
                {{ item.label }}
                <svg
                  :class="[
                    'h-4 w-4 transition-transform duration-300',
                    expandedSubmenus[item.label] ? 'rotate-90' : 'rotate-0',
                  ]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>

            <transition name="submenu">
              <div
                v-show="expandedSubmenus[item.label] && !isCollapsed"
                class="ml-6 mt-1 space-y-1 text-sm text-gray-600 dark:text-gray-300"
              >
                <RouterLink
                  v-for="child in item.children"
                  :key="child.label"
                  :to="child.to!"
                  :class="getChildLinkClass(child.to)"
                >
                  <component :is="child.icon" class="w-4 h-4" />
                  {{ child.label }}
                </RouterLink>
              </div>
            </transition>
          </div>
        </template>
      </nav>
    </div>

    <!-- Bottom -->
    <div
      v-if="!isCollapsed"
      class="mt-8 text-xs text-gray-500 dark:text-gray-400 text-center space-y-1 px-1"
    >
      <p>
        <span class="font-medium text-gray-700 dark:text-white">Versi Aplikasi</span> 1.0.0 Mastrav
      </p>
      <p>Admin Templates</p>
      <p>
        Developed by
        <a
          href="https://wa.me/6289510056758"
          target="_blank"
          class="font-semibold text-blue-600 hover:text-blue-500"
        >
          Masmut Dev
        </a>
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  IconLayoutDashboard,
  IconUsers,
  IconChecklist,
  IconClock,
  IconCalendarEvent,
  IconCreditCard,
} from '@tabler/icons-vue'
import type { FunctionalComponent } from 'vue'

interface MenuItem {
  label: string
  to?: string
  icon: FunctionalComponent
  children?: MenuItem[]
}

const isCollapsed = ref(false)
const expandedSubmenus = ref<Record<string, boolean>>({})
const route = useRoute()

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

defineExpose({
  toggleSidebar,
  isCollapsed,
})

const toggleSubmenu = (label: string) =>
  (expandedSubmenus.value[label] = !expandedSubmenus.value[label])

const getLinkClass = (to?: string) => [
  'flex items-center gap-3 px-3 py-2 rounded-lg font-medium',
  route.path === to
    ? 'bg-green-500 text-white'
    : 'text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:text-gray-800',
]

const getParentLinkClass = (item: MenuItem) =>
  item.children?.some((child) => child.to === route.path)
    ? 'bg-green-500 text-white'
    : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:text-gray-800'

const getChildLinkClass = (to?: string) => [
  'flex items-center gap-2 px-2 py-1 rounded hover:text-gray-800 dark:hover:text-white',
  route.path === to ? 'bg-green-300 text-gray-800 dark:text-gray-800' : '',
]

const menu: MenuItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: IconLayoutDashboard },
  { label: 'Data Pelanggan', to: '/data-pelanggan', icon: IconUsers },
  {
    label: 'Proyek Saya',
    icon: IconChecklist,
    children: [
      { label: 'Manage Proyek', to: '/proyek/manage', icon: IconLayoutDashboard },
      { label: 'Tambah Proyek', to: '/proyek/tambah', icon: IconCreditCard },
    ],
  },
  { label: 'Whatsapp Blast', to: '/whatsapp-blast', icon: IconClock },
  { label: 'Dokumentasi', to: '/dokumentasi', icon: IconCalendarEvent },
  { label: 'API', to: '/api', icon: IconCreditCard },
]

watch(
  () => route.path,
  (newPath) => {
    expandedSubmenus.value = {}
    menu.forEach((item) => {
      if (item.children?.some((child) => child.to === newPath)) {
        expandedSubmenus.value[item.label] = true
      }
    })
  },
  { immediate: true },
)
</script>

<style scoped>
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}
.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
