<template>
  <div class="flex items-center gap-4 relative">
    <!-- Notifikasi -->
    <div class="relative" ref="notifRef">
      <svg
        @click="showNotif = !showNotif"
        class="w-6 h-6 text-gray-600 dark:text-white cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>

      <div
        v-if="showNotif"
        class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 dark:border-gray-600 rounded-xl shadow-xl z-50"
      >
        <div class="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 class="font-semibold text-gray-900 dark:text-white">Notification</h3>
          <span class="text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full font-medium">
            8 New
          </span>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-start gap-3 px-4 py-3">
            <img src="https://i.pravatar.cc/32?u=1" class="rounded-full h-8 w-8" />
            <div class="flex-1 text-sm">
              <p class="font-medium text-gray-900 dark:text-white">Congratulation Lettie 🎉</p>
              <p class="text-gray-500 dark:text-gray-300 text-xs">
                Won the monthly best seller gold badge
              </p>
              <p class="text-xs text-gray-400 mt-1">12h ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 px-4 py-3">
            <div
              class="bg-red-100 text-red-600 font-bold flex items-center justify-center rounded-full w-8 h-8"
            >
              CF
            </div>
            <div class="flex-1 text-sm">
              <p class="font-medium text-gray-900 dark:text-white">Charles Franklin</p>
              <p class="text-gray-500 dark:text-gray-300 text-xs">Accepted your connection</p>
              <p class="text-xs text-gray-400 mt-1">12h ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 px-4 py-3">
            <img src="https://i.pravatar.cc/32?u=2" class="rounded-full h-8 w-8" />
            <div class="flex-1 text-sm">
              <p class="font-medium text-gray-900 dark:text-white">New Message ✉️</p>
              <p class="text-gray-500 dark:text-gray-300 text-xs">
                You have new message from Natalie
              </p>
              <p class="text-xs text-gray-400 mt-1">1h ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 px-4 py-3">
            <div
              class="bg-green-100 text-green-600 flex items-center justify-center rounded-full w-8 h-8"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h18v18H3V3z"
                />
              </svg>
            </div>
            <div class="flex-1 text-sm">
              <p class="font-medium text-gray-900 dark:text-white">Whoo! You have new order 🛒</p>
              <p class="text-gray-500 dark:text-gray-300 text-xs">
                ACME Inc. made new order $1,154
              </p>
              <p class="text-xs text-gray-400 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
        <div class="p-3 text-center">
          <button
            class="w-full text-sm text-white bg-violet-600 hover:bg-violet-700 rounded px-4 py-2"
          >
            View all notifications
          </button>
        </div>
      </div>
    </div>

    <!-- User -->
    <div class="relative" ref="userRef">
      <img
        @click="showUserMenu = !showUserMenu"
        src="https://i.pravatar.cc/40?u=header"
        alt="avatar"
        class="h-8 w-8 rounded-full cursor-pointer"
      />
      <div
        v-if="showUserMenu"
        class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 dark:border-gray-600 rounded-xl shadow-xl z-50 text-sm"
      >
        <div class="flex items-center gap-3 px-4 py-3 border-b dark:border-gray-600">
          <img src="https://i.pravatar.cc/40?u=header" class="h-10 w-10 rounded-full" />
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">John Doe</p>
            <p class="text-xs text-gray-500 dark:text-gray-300">Admin</p>
          </div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-300">
          <li
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
          >
            <IconUser class="w-4 h-4" /> My Profile
          </li>
          <li
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
          >
            <IconSettings class="w-4 h-4" /> Settings
          </li>
          <li
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2 relative"
          >
            <IconCreditCard class="w-4 h-4" /> Billing
            <span
              class="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5"
            >
              4
            </span>
          </li>
          <li
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
          >
            <IconLanguage class="w-4 h-4" /> Bahasa
          </li>
          <li
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <component :is="darkMode ? IconMoon : IconSun" class="w-4 h-4" />
              {{ darkMode ? 'Dark Mode' : 'Light Mode' }}
            </div>
            <div
              class="w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out cursor-pointer"
              :class="darkMode ? 'bg-gray-600' : 'bg-gray-300'"
              @click="toggleDarkMode"
            >
              <div
                class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
                :class="darkMode ? 'translate-x-5' : 'translate-x-0'"
              />
            </div>
          </li>
        </ul>
        <div class="p-3">
          <button
            class="w-full bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 flex items-center justify-center gap-2"
          >
            <IconLogout class="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  IconUser,
  IconCreditCard,
  IconSettings,
  IconLanguage,
  IconMoon,
  IconSun,
  IconLogout,
} from '@tabler/icons-vue'

const showNotif = ref(false)
const showUserMenu = ref(false)
const darkMode = ref(false)

const notifRef = ref<HTMLElement | null>(null)
const userRef = ref<HTMLElement | null>(null)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  applyDarkMode()
}

const applyDarkMode = () => {
  const root = document.documentElement
  if (darkMode.value) {
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    root.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (notifRef.value && !notifRef.value.contains(target)) showNotif.value = false
  if (userRef.value && !userRef.value.contains(target)) showUserMenu.value = false
}

onMounted(() => {
  darkMode.value = localStorage.getItem('theme') === 'dark'
  applyDarkMode()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
