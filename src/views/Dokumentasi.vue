<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { IconChevronUp, IconChevronDown } from '@tabler/icons-vue'

interface Record {
  id: number
  nama: string
  email: string
  status: 'Aktif' | 'Tidak Aktif'
}

const apiSource = 'https://randomuser.me/api/?results=100'

const pelanggan = ref<Record[]>([])
const search = ref('')
const page = ref(1)
const perPage = ref(10)
const loading = ref(true)
const selected = ref<number[]>([])
const showModal = ref(false)
const selectedData = ref<Record | null>(null)

const sort = ref<{ by: keyof Record | null; direction: 'asc' | 'desc' }>({
  by: null,
  direction: 'asc',
})

const toggleSort = (key: keyof Record) => {
  if (sort.value.by === key) {
    sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value.by = key
    sort.value.direction = 'asc'
  }
}

const filtered = computed(() => {
  let result = [...pelanggan.value]

  if (search.value) {
    const keyword = search.value.toLowerCase()
    result = result.filter(
      (p) => p.nama.toLowerCase().includes(keyword) || p.email.toLowerCase().includes(keyword),
    )
  }

  if (sort.value.by) {
    result.sort((a, b) => {
      const aVal = a[sort.value.by!].toString().toLowerCase()
      const bVal = b[sort.value.by!].toString().toLowerCase()
      return (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * (sort.value.direction === 'asc' ? 1 : -1)
    })
  }

  return result
})

const paginated = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

const totalPage = computed(() => Math.ceil(filtered.value.length / perPage.value))

const allVisibleSelected = computed(
  () => paginated.value.length > 0 && paginated.value.every((p) => selected.value.includes(p.id)),
)

const toggleSelectAll = () => {
  const visibleIds = paginated.value.map((p) => p.id)
  selected.value = allVisibleSelected.value
    ? selected.value.filter((id) => !visibleIds.includes(id))
    : Array.from(new Set([...selected.value, ...visibleIds]))
}

const handleEdit = (p: Record) => {
  selectedData.value = p
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedData.value = null
}

const theadRef = ref<HTMLElement | null>(null)
const columnCount = ref(0)

onMounted(() => {
  if (theadRef.value) {
    columnCount.value = theadRef.value.querySelector('tr')?.children.length || 0
  }
})
onMounted(async () => {
  const res = await fetch(apiSource)
  const data = await res.json()
  pelanggan.value = data.results.map((user: any, i: number) => ({
    id: i + 1,
    nama: `${user.name.first} ${user.name.last}`,
    email: user.email,
    status: Math.random() > 0.5 ? 'Aktif' : 'Tidak Aktif',
  }))
  loading.value = false
})

watch([perPage, search], () => {
  page.value = 1
})
</script>

<template>
  <div class="bg-white rounded-lg p-4 space-y-4">
    <!-- Controls -->
    <div class="flex flex-col sm:flex-row justify-start gap-4">
      <select v-model="perPage" class="px-3 py-2 border rounded text-sm">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama/email..."
        class="w-full sm:w-1/3 px-3 py-2 border rounded text-sm"
      />
    </div>

    <!-- Table -->
    <table class="min-w-full text-sm text-left text-gray-700">
      <thead class="bg-gray-100" ref="theadRef">
        <tr>
          <th class="px-4 py-2">
            <input type="checkbox" :checked="allVisibleSelected" @change="toggleSelectAll" />
          </th>
          <th class="px-4 py-2">No</th>
          <th class="px-4 py-2 cursor-pointer" @click="toggleSort('nama')">
            Nama
            <IconChevronUp
              class="inline w-4 h-4"
              :class="
                sort.by === 'nama' && sort.direction === 'asc' ? 'text-blue-500' : 'text-gray-400'
              "
            />
            <IconChevronDown
              class="inline w-4 h-4"
              :class="
                sort.by === 'nama' && sort.direction === 'desc' ? 'text-blue-500' : 'text-gray-400'
              "
            />
          </th>
          <th class="px-4 py-2 cursor-pointer" @click="toggleSort('email')">
            Email
            <IconChevronUp
              class="inline w-4 h-4"
              :class="
                sort.by === 'email' && sort.direction === 'asc' ? 'text-blue-500' : 'text-gray-400'
              "
            />
            <IconChevronDown
              class="inline w-4 h-4"
              :class="
                sort.by === 'email' && sort.direction === 'desc' ? 'text-blue-500' : 'text-gray-400'
              "
            />
          </th>
          <th class="px-4 py-2 cursor-pointer" @click="toggleSort('status')">
            Status
            <IconChevronUp
              class="inline w-4 h-4"
              :class="
                sort.by === 'status' && sort.direction === 'asc' ? 'text-blue-500' : 'text-gray-400'
              "
            />
            <IconChevronDown
              class="inline w-4 h-4"
              :class="
                sort.by === 'status' && sort.direction === 'desc'
                  ? 'text-blue-500'
                  : 'text-gray-400'
              "
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columnCount" class="text-center px-4 py-3">Memuat data...</td>
        </tr>
        <tr v-else-if="filtered.length === 0">
          <td :colspan="columnCount" class="text-center px-4 py-3">Tidak Ada Data</td>
        </tr>
        <tr v-else v-for="(p, i) in paginated" :key="p.id" class="border-b">
          <td class="px-4 py-2">
            <input type="checkbox" :value="p.id" v-model="selected" />
          </td>
          <td class="px-4 py-2">{{ (page - 1) * perPage + i + 1 }}</td>
          <td class="px-4 py-2">{{ p.nama }}</td>
          <td class="px-4 py-2">{{ p.email }}</td>
          <td class="px-4 py-2">
            <span
              :class="[
                'px-2 py-1 rounded text-xs font-medium',
                p.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
              ]"
            >
              {{ p.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
      <div class="text-sm text-gray-600">
        Menampilkan {{ paginated.length }} data dari {{ filtered.length }} data
      </div>
      <div class="flex items-center gap-2">
        <button
          :disabled="page === 1"
          @click="page--"
          class="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Prev
        </button>
        <span class="text-sm">Page {{ page }} / {{ totalPage }}</span>
        <button
          :disabled="page === totalPage"
          @click="page++"
          class="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 class="text-lg font-semibold mb-4">Edit Data</h2>
        <div class="space-y-2 text-sm text-gray-700">
          <div><strong>Nama:</strong> {{ selectedData?.nama }}</div>
          <div><strong>Email:</strong> {{ selectedData?.email }}</div>
          <div><strong>Status:</strong> {{ selectedData?.status }}</div>
        </div>
        <div class="mt-6 flex justify-end gap-2">
          <button
            class="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            @click="closeModal"
          >
            Tutup
          </button>
          <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
