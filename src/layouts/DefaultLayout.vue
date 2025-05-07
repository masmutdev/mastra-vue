<template>
  <component :is="isMobile ? MobileLayout : DesktopLayout" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MobileLayout from './MobileLayout.vue'
import DesktopLayout from './DesktopLayout.vue'

const isMobile = ref(false)

// onMounted(() => {
//   isMobile.value = /Mobi|Android/i.test(navigator.userAgent)
// })
</script>
