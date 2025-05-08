<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4"
  >
    <div class="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md text-center">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="@/assets/img/logo.png" alt="Logo" class="w-12 h-12 object-contain" />
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Sign up to get started</p>

      <!-- Social Buttons -->
      <div class="flex justify-center gap-4 mb-6">
        <button
          class="cursor-pointer p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <img src="@/assets/img/google.png" class="w-5 h-5" />
        </button>
        <button
          class="cursor-pointer p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <img src="@/assets/img/github.png" class="w-5 h-5" />
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-4 text-left">
        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
            />
            <button
              type="button"
              class="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
              @click="togglePassword"
            >
              <component :is="showPassword ? IconEyeOff : IconEye" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Retype Password</label>
          <div class="relative">
            <input
              v-model="retypePassword"
              :type="showRetypePassword ? 'text' : 'password'"
              required
              class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
            />
            <button
              type="button"
              class="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
              @click="toggleRetypePassword"
            >
              <component :is="showRetypePassword ? IconEyeOff : IconEye" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-2 bg-gradient-to-b from-gray-800 to-black text-white rounded text-sm font-medium hover:opacity-90"
        >
          Sign up
        </button>
      </form>

      <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Already have an account?
        <router-link to="/login" class="text-black dark:text-white font-medium hover:underline">
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IconEye, IconEyeOff } from '@tabler/icons-vue'

const router = useRouter()

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const retypePassword = ref('')
const showPassword = ref(false)
const showRetypePassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleRetypePassword = () => {
  showRetypePassword.value = !showRetypePassword.value
}
const handleRegister = () => {
  if (password.value !== retypePassword.value) {
    alert('Password tidak cocok!')
    return
  }

  console.log('📝 Register with:', {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
  })

  router.push('/login')
}
</script>
