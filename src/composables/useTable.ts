/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed, watch, toRaw } from 'vue'

export interface SortState<T> {
  by: keyof T | null
  direction: 'asc' | 'desc'
}

export interface WithId<T> {
  id: number
  data: T
}

export function useTable<T extends Record<string, any>>() {
  const items = ref<WithId<T>[]>([])
  const search = ref('')
  const page = ref(1)
  const perPage = ref(10)
  const loading = ref(false)
  const selected = ref<number[]>([])
  const showModal = ref(false)
  const selectedData = ref<WithId<T> | null>(null)
  const theadRef = ref<HTMLElement | null>(null)
  const columnCount = ref(0)

  const sortBy = ref<keyof T | null>(null)
  const sortDirection = ref<'asc' | 'desc'>('asc')

  const toggleSort = (key: keyof T) => {
    if (sortBy.value === key) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = key
      sortDirection.value = 'asc'
    }
  }

  type FilterFn = (item: T, keyword: string) => boolean
  const customFilter = ref<FilterFn | null>(null)

  const setCustomFilter = (fn: FilterFn) => {
    customFilter.value = fn
  }

  const filtered = computed(() => {
    let result = [...items.value]

    if (search.value && customFilter.value) {
      const keyword = search.value.toLowerCase()
      result = result.filter(({ data }) => customFilter.value!(data as T, keyword))
    }

    if (sortBy.value) {
      const key = sortBy.value
      result.sort((a, b) => {
        const aVal = String((toRaw(a.data) as Record<string, any>)[key]).toLowerCase()
        const bVal = String((toRaw(b.data) as Record<string, any>)[key]).toLowerCase()
        return (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * (sortDirection.value === 'asc' ? 1 : -1)
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
    () =>
      paginated.value.length > 0 &&
      paginated.value.every((item) => selected.value.includes(item.id)),
  )

  const toggleSelectAll = () => {
    const visibleIds = paginated.value.map((item) => item.id)
    selected.value = allVisibleSelected.value
      ? selected.value.filter((id) => !visibleIds.includes(id))
      : [...new Set([...selected.value, ...visibleIds])]
  }

  const setItems = (data: T[]) => {
    items.value = data.map((d, i) => ({
      id: i + 1,
      data: d,
    }))
  }

  const fetchFromApi = async <Raw = unknown>(
    url: string,
    mapper: (raw: Raw) => T,
    resultKey = 'results',
  ) => {
    loading.value = true
    try {
      const res = await fetch(url)
      const json = await res.json()
      const rawArray = resultKey ? json[resultKey] : json
      setItems((rawArray as Raw[]).map(mapper))
    } catch (err) {
      console.error('error ngentod:', err)
    } finally {
      loading.value = false
    }
  }

  const handleEdit = (item: WithId<T>) => {
    selectedData.value = item
    showModal.value = true
  }

  const deleteTarget = ref<WithId<T> | null>(null)
  const showDeleteConfirm = ref(false)

  const confirmDelete = (item: WithId<T>) => {
    deleteTarget.value = item
    showDeleteConfirm.value = true
  }

  const deleteItem = () => {
    if (deleteTarget.value) {
      items.value = items.value.filter((i) => i.id !== deleteTarget.value!.id)
    }
    showDeleteConfirm.value = false
  }

  const closeModal = () => {
    showModal.value = false
    selectedData.value = null
  }

  watch([perPage, search], () => {
    page.value = 1
  })

  return {
    items,
    search,
    page,
    perPage,
    loading,
    selected,
    showModal,
    selectedData,
    sort: {
      by: sortBy,
      direction: sortDirection,
    },
    toggleSort,
    filtered,
    paginated,
    totalPage,
    allVisibleSelected,
    toggleSelectAll,
    handleEdit,
    closeModal,
    theadRef,
    columnCount,
    setItems,
    setCustomFilter,
    fetchFromApi,
    deleteTarget,
    showDeleteConfirm,
    confirmDelete,
    deleteItem,
  }
}
