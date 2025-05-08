<template>
  <component :is="currentComponent" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MobileLayout from './MobileLayout.vue'
import DesktopLayout from './DesktopLayout.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

const route = useRoute()

const currentComponent = computed(() => {
  if (route.path === '/login') return Login
  if (route.path === '/register') return Register

  const isMobile = /Mobi|Android/i.test(navigator.userAgent)
  return isMobile ? MobileLayout : DesktopLayout
})
</script>
