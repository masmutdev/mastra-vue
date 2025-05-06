<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
    <!-- Controls -->
    <div class="flex flex-col sm:flex-row justify-start gap-4">
      <select
        v-model="table.perPage.value"
        class="px-3 py-2 border rounded text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-white text-gray-900 dark:text-white"
      >
        <option v-for="n in [5, 10, 25, 50, 100]" :key="n" :value="n">{{ n }}</option>
      </select>

      <input
        v-model="table.search.value"
        type="text"
        placeholder="Cari nama/email..."
        class="w-full sm:w-1/3 px-3 py-2 border rounded text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-white text-gray-900 dark:text-white"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparen">
      <table class="min-w-full text-sm text-left text-gray-700 dark:text-white">
        <thead class="bg-gray-100 dark:bg-gray-700" ref="table.theadRef">
          <tr>
            <th class="px-4 py-2">
              <input
                type="checkbox"
                :checked="table.allVisibleSelected.value"
                @change="table.toggleSelectAll"
              />
            </th>
            <th class="px-4 py-2">No</th>
            <th
              v-for="col in ['nama', 'email', 'status', 'gender', 'phone', 'lokasi']"
              :key="col"
              class="px-4 py-2 cursor-pointer select-none"
              @click="table.toggleSort(col as keyof Pelanggan)"
            >
              <div class="flex justify-between gap-1">
                <span>{{ col.charAt(0).toUpperCase() + col.slice(1) }}</span>
                <div class="relative flex flex-col items-center">
                  <IconChevronUp
                    class="absolute bottom-[6px] w-4 h-4"
                    :class="{
                      'text-gray-400':
                        table.sort.by.value !== col || table.sort.direction.value !== 'asc',
                      'text-black':
                        table.sort.by.value === col && table.sort.direction.value === 'asc',
                    }"
                  />
                  <IconChevronDown
                    class="absolute top-[6px] w-4 h-4"
                    :class="{
                      'text-gray-400':
                        table.sort.by.value !== col || table.sort.direction.value !== 'desc',
                      'text-black':
                        table.sort.by.value === col && table.sort.direction.value === 'desc',
                    }"
                  />
                </div>
              </div>
            </th>
            <th class="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="table.loading.value">
            <td :colspan="columnCount" class="text-center px-4 py-3">Memuat data...</td>
          </tr>
          <tr v-else-if="table.filtered.value.length === 0">
            <td :colspan="columnCount" class="text-center px-4 py-3">Tidak Ada Data</td>
          </tr>
          <tr v-else v-for="(item, i) in table.paginated.value" :key="item.id" class="border-b">
            <td class="px-4 py-2">
              <input type="checkbox" :value="item.id" v-model="table.selected.value" />
            </td>
            <td class="px-4 py-2">{{ (table.page.value - 1) * table.perPage.value + i + 1 }}</td>
            <td class="px-4 py-2">{{ item.data.nama }}</td>
            <td class="px-4 py-2">{{ item.data.email }}</td>
            <td class="px-4 py-2">
              <div class="w-[100px] flex items-center">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium w-full text-center',
                    item.data.status === 'Aktif'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{ item.data.status }}
                </span>
              </div>
            </td>
            <td class="px-4 py-2">
              <div class="w-[100px] flex justify-center">
                {{ item.data.gender }}
              </div>
            </td>
            <td class="px-4 py-2">{{ item.data.phone }}</td>
            <td class="px-4 py-2">{{ item.data.lokasi }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button
                @click="table.handleEdit(item)"
                class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                Edit
              </button>
              <button
                @click="table.confirmDelete(item)"
                class="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
      <div class="text-sm text-gray-600 dark:text-white">
        Menampilkan {{ table.paginated.value.length }} dari {{ table.filtered.value.length }} data
      </div>
      <div class="flex items-center gap-2">
        <button
          :disabled="table.page.value === 1"
          @click="table.page.value--"
          class="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Prev
        </button>
        <span class="text-sm text-gray-600 dark:text-white"
          >Page {{ table.page.value }} / {{ table.totalPage.value }}</span
        >
        <button
          :disabled="table.page.value === table.totalPage.value"
          @click="table.page.value++"
          class="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal Edit -->
    <div
      v-if="table.showModal.value"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 class="text-lg font-semibold mb-4">Edit Data</h2>
        <div class="space-y-3 text-sm text-gray-700">
          <label class="block">
            <span class="block mb-1">Nama</span>
            <input
              v-model="table.selectedData.value!.data.nama"
              class="w-full border px-2 py-1 rounded"
            />
          </label>
          <label class="block">
            <span class="block mb-1">Email</span>
            <input
              v-model="table.selectedData.value!.data.email"
              class="w-full border px-2 py-1 rounded"
            />
          </label>
          <label class="block">
            <span class="block mb-1">Status</span>
            <select
              v-model="table.selectedData.value!.data.status"
              class="w-full border px-2 py-1 rounded"
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </label>
        </div>
        <div class="mt-6 flex justify-end gap-2">
          <button
            @click="table.closeModal"
            class="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            @click="table.closeModal"
            class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Delete -->
    <div
      v-if="table.showDeleteConfirm.value"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 class="text-lg font-semibold mb-4 text-red-600">Konfirmasi Hapus</h2>
        <p class="text-sm text-gray-700">
          Apakah kamu yakin ingin menghapus data
          <strong>{{ table.deleteTarget.value?.data.nama }}</strong
          >?
        </p>
        <div class="mt-6 flex justify-end gap-2">
          <button
            @click="table.showDeleteConfirm.value = false"
            class="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            @click="table.deleteItem"
            class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTable } from '@/composables/useTable'
import { IconChevronUp, IconChevronDown } from '@tabler/icons-vue'

const mapUser = (user: {
  name: { first: string; last: string }
  email: string
  gender: string
  phone: string
  location: { city: string; country: string }
}) => ({
  nama: `${user.name.first} ${user.name.last}`,
  email: user.email,
  status: Math.random() > 0.5 ? 'Aktif' : ('Tidak Aktif' as const),
  gender: user.gender,
  phone: user.phone,
  lokasi: `${user.location.city}, ${user.location.country}`,
})

type Pelanggan = ReturnType<typeof mapUser>
const table = useTable<Pelanggan>()

const columnCount = 5

onMounted(async () => {
  await table.fetchFromApi('https://randomuser.me/api/?results=100', mapUser)
})

table.setCustomFilter(
  (item, keyword) =>
    item.nama.toLowerCase().includes(keyword) || item.email.toLowerCase().includes(keyword),
)
</script>
