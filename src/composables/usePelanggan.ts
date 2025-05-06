// composables/usePelanggan.ts
import { ref, computed, onMounted, watch } from 'vue'

export interface Pelanggan {
  id: number
  nama: string
  email: string
  status: 'Aktif' | 'Tidak Aktif'
}

export function usePelanggan() {
  const pelanggan = ref<Pelanggan[]>([])
  const search = ref('')
  const page = ref(1)
  const perPage = ref(10)
  const loading = ref(true)
  const selected = ref<number[]>([])
  const showModal = ref(false)
  const selectedData = ref<Pelanggan | null>(null)
  const columnCount = 6

  const filtered = computed(() => {
    if (!search.value) return pelanggan.value
    return pelanggan.value.filter(
      (p) =>
        p.nama.toLowerCase().includes(search.value.toLowerCase()) ||
        p.email.toLowerCase().includes(search.value.toLowerCase()),
    )
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
    if (allVisibleSelected.value) {
      selected.value = selected.value.filter((id) => !paginated.value.some((p) => p.id === id))
    } else {
      const newIds = paginated.value.map((p) => p.id)
      selected.value = Array.from(new Set([...selected.value, ...newIds]))
    }
  }

  const handleEdit = (p: Pelanggan) => {
    selectedData.value = p
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    selectedData.value = null
  }

  const handleDelete = (p: Pelanggan) => {
    pelanggan.value = pelanggan.value.filter((x) => x.id !== p.id)
    selected.value = selected.value.filter((id) => id !== p.id)
  }

  onMounted(async () => {
    const res = await fetch('https://randomuser.me/api/?results=100')
    const data = await res.json()
    pelanggan.value = data.results.map((user: any, i: number) => ({
      id: i + 1,
      nama: `${user.name.first} ${user.name.last}`,
      email: user.email,
      status: Math.random() > 0.5 ? 'Aktif' : 'Tidak Aktif',
    }))
    loading.value = false
  })

  watch(perPage, () => {
    page.value = 1
  })

  watch(search, () => {
    page.value = 1
  })

  return {
    pelanggan,
    search,
    page,
    perPage,
    loading,
    selected,
    showModal,
    selectedData,
    columnCount,
    filtered,
    paginated,
    totalPage,
    allVisibleSelected,
    toggleSelectAll,
    handleEdit,
    handleDelete,
    closeModal,
  }
}
