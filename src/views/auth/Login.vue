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
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Please enter your details to sign in
      </p>

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

      <!-- Divider -->
      <div class="flex items-center mb-6">
        <div class="flex-grow border-t border-gray-200 dark:border-gray-700" />
        <span class="mx-3 text-xs text-gray-400">OR</span>
        <div class="flex-grow border-t border-gray-200 dark:border-gray-700" />
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4 text-left">
        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Your Email Address</label
          >
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
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white pr-10"
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

        <div class="flex items-center justify-between text-sm">
          <label class="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input type="checkbox" class="rounded border-gray-300 dark:border-gray-600" />
            Remember me
          </label>
          <a href="#" class="text-blue-500 hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          class="w-full py-2 bg-gradient-to-b from-gray-800 to-black text-white rounded text-sm font-medium hover:opacity-90"
        >
          Sign in
        </button>
      </form>

      <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Don’t have an account?
        <router-link to="/register" class="text-black dark:text-white font-medium hover:underline"
          >Sign up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IconEye, IconEyeOff } from '@tabler/icons-vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  try {
    const res = await fetch('https://api.asterdamtoefltest2.com/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await res.json()

    if (data.success) {
      console.log('✅ Login sukses:', data)
      localStorage.setItem('loggedIn', 'true')
      // Simpan token atau user info jika ada
      router.push('/')
    } else {
      alert('❌ Login gagal: ' + (data.message || 'Email atau password salah'))
    }
  } catch (err) {
    console.error('❌ Error login:', err)
    alert('Gagal terhubung ke server.')
  }
}
</script>
