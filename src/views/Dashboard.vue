<script setup lang="ts">
import { IconFolder, IconCheck, IconClock, IconX, IconUser, IconBriefcase } from '@tabler/icons-vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
  datasets: [
    {
      label: 'Proyek Saya',
      backgroundColor: '#3b82f6', // tailwind blue-500
      data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 10) + 1),
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Statistik Proyek Bulanan' },
  },
}
</script>

<template>
  <section class="space-y-8">
    <!-- 4 Info Box -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-4 bg-white dark:bg-gray-800 shadow rounded flex items-center gap-4">
        <IconFolder class="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <div>
          <h3 class="text-sm text-gray-500 dark:text-gray-400">Total Project</h3>
          <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">24</p>
        </div>
      </div>
      <div class="p-4 bg-white dark:bg-gray-800 shadow rounded flex items-center gap-4">
        <IconCheck class="w-8 h-8 text-green-500 dark:text-green-400" />
        <div>
          <h3 class="text-sm text-gray-500 dark:text-gray-400">Project Selesai</h3>
          <p class="text-2xl font-bold text-green-500 dark:text-green-400">18</p>
        </div>
      </div>
      <div class="p-4 bg-white dark:bg-gray-800 shadow rounded flex items-center gap-4">
        <IconClock class="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
        <div>
          <h3 class="text-sm text-gray-500 dark:text-gray-400">Project Dikerjakan</h3>
          <p class="text-2xl font-bold text-yellow-500 dark:text-yellow-400">4</p>
        </div>
      </div>
      <div class="p-4 bg-white dark:bg-gray-800 shadow rounded flex items-center gap-4">
        <IconX class="w-8 h-8 text-red-500 dark:text-red-400" />
        <div>
          <h3 class="text-sm text-gray-500 dark:text-gray-400">Project Gagal</h3>
          <p class="text-2xl font-bold text-red-500 dark:text-red-400">2</p>
        </div>
      </div>
    </div>

    <!-- 2 Card Info -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Kiri -->
      <div class="p-6 bg-white dark:bg-gray-800 shadow rounded space-y-4">
        <div class="flex items-center gap-2">
          <IconUser class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Proyek Pribadi</h3>
        </div>
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Total Proyek</span>
          <span>10</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Estimasi Pendapatan</span>
          <span>Rp12.000.000</span>
        </div>
      </div>

      <!-- Kanan -->
      <div class="p-6 bg-white dark:bg-gray-800 shadow rounded space-y-4">
        <div class="flex items-center gap-2">
          <IconBriefcase class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Proyek Client</h3>
        </div>
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Total Proyek</span>
          <span>14</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Estimasi Pendapatan</span>
          <span>Rp25.000.000</span>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="bg-white dark:bg-gray-800 shadow rounded p-6">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>
