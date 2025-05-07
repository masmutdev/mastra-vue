<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
    <div
      class="flex items-center justify-between px-4 py-3 border-b dark:border-b border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Data Pelanggan</h2>
      <div class="flex items-center gap-2">
        <button
          @click="tambahPelanggan"
          class="cursor-pointer px-3 py-1.5 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Tambah
        </button>

        <div class="relative" ref="dropdownRef">
          <button
            @click="toggleBulkMenu"
            class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IconDotsVertical class="w-5 h-5 text-gray-700 dark:text-white" />
          </button>

          <div
            v-if="showDotsMenu"
            class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-50"
          >
            <button
              @click="bulkEdit"
              :disabled="table.selected.value.length === 0"
              class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IconEdit class="w-4 h-4 text-yellow-500" />
              Bulk Edit
            </button>

            <button
              @click="bulkDelete"
              :disabled="table.selected.value.length === 0"
              class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IconTrash class="w-4 h-4 text-red-500" />
              Bulk Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex flex-col sm:flex-row justify-start gap-4">
      <select
        v-model="table.perPage.value"
        class="cursor-pointer px-3 py-2 border rounded text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-white text-gray-900 dark:text-white"
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
                class="cursor-pointer text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                Edit
              </button>
              <button
                @click="table.confirmDelete(item)"
                class="cursor-pointer text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
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
          class="cursor-pointer px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Prev
        </button>
        <span class="text-sm text-gray-600 dark:text-white"
          >Page {{ table.page.value }} / {{ table.totalPage.value }}</span
        >
        <button
          :disabled="table.page.value === table.totalPage.value"
          @click="table.page.value++"
          class="cursor-pointer px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>

    <AddModal
      v-if="table.showModal.value && table.isCreating.value && table.selectedData.value"
      :show="true"
      :model="table.selectedData.value.data"
      :onClose="table.closeModal"
      :onSave="table.saveItem"
    />

    <EditModal
      v-if="table.showModal.value && !table.isCreating.value && table.selectedData.value"
      :show="true"
      :model="table.selectedData.value.data"
      :onClose="table.closeModal"
      :onSave="table.saveItem"
    />

    <DeleteModal
      :show="table.showDeleteConfirm.value"
      :nama="table.deleteTarget.value?.data.nama ?? ''"
      :onCancel="() => (table.showDeleteConfirm.value = false)"
      :onConfirm="table.deleteItem"
    />

    <BulkEditModal
      :show="showBulkEdit"
      :count="table.selected.value.length"
      :onClose="() => (showBulkEdit = false)"
      :onSave="handleBulkEdit"
    />

    <BulkDeleteModal
      :show="showBulkDelete"
      :count="table.selected.value.length"
      :onCancel="() => (showBulkDelete = false)"
      :onConfirm="handleBulkDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTable } from '@/composables/useTable'
import {
  IconChevronUp,
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@tabler/icons-vue'
import AddModal from '@/components/modal/AddModal.vue'
import EditModal from '@/components/modal/EditModal.vue'
import DeleteModal from '@/components/modal/DeleteModal.vue'
import BulkEditModal from '@/components/modal/BulkEditModal.vue'
import BulkDeleteModal from '@/components/modal/BulkDeleteModal.vue'
import { onClickOutside } from '@vueuse/core'

const mapUser = (user: {
  name: { first: string; last: string }
  email: string
  gender: string
  phone: string
  location: { city: string; country: string }
}) => ({
  nama: `${user.name.first} ${user.name.last}`,
  email: user.email,
  status: (Math.random() > 0.5 ? 'Aktif' : 'Tidak Aktif') as 'Aktif' | 'Tidak Aktif',
  gender: user.gender,
  phone: user.phone,
  lokasi: `${user.location.city}, ${user.location.country}`,
})

type Pelanggan = ReturnType<typeof mapUser>
const table = useTable<Pelanggan>()

const columnCount = 8

onMounted(async () => {
  await table.fetchFromApi('https://randomuser.me/api/?results=100', mapUser)
})

const showDotsMenu = ref(false)
const toggleBulkMenu = () => {
  showDotsMenu.value = !showDotsMenu.value
}

const dropdownRef = ref(null)
onClickOutside(dropdownRef, () => (showDotsMenu.value = false))

const pelangganBaru: Pelanggan = {
  nama: '',
  email: '',
  status: 'Aktif',
  gender: '',
  phone: '',
  lokasi: '',
}

const tambahPelanggan = () => {
  table.createNew(pelangganBaru)
}

const bulkEdit = () => {
  showBulkEdit.value = true
}

const bulkDelete = () => {
  showBulkDelete.value = true
}

const showBulkEdit = ref(false)
const showBulkDelete = ref(false)

const handleBulkEdit = (status: 'Aktif' | 'Tidak Aktif') => {
  table.items.value.forEach((item) => {
    if (table.selected.value.includes(item.id)) {
      item.data.status = status
    }
  })
  showBulkEdit.value = false
}

const handleBulkDelete = () => {
  table.items.value = table.items.value.filter((item) => !table.selected.value.includes(item.id))
  table.selected.value = []
  showBulkDelete.value = false
}
table.setCustomFilter(
  (item, keyword) =>
    item.nama.toLowerCase().includes(keyword) || item.email.toLowerCase().includes(keyword),
)
</script>
