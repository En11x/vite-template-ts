import { onMounted, reactive, ref, watch } from 'vue'

interface RequestReturn<T = any> {
  data: T[]
  total: number
}

interface IUseListOptions<T> {
  onFetch: (...args: any) => Promise<RequestReturn<T>>
  immediate?: boolean
  filter?: Record<string, string>
}

export const useList = <T>(options: IUseListOptions<T>) => {
  const { immediate = true, onFetch, filter } = options
  const loading = ref(false)
  const list = ref<T[]>([])
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  const dispatchRequest = async () => {
    loading.value = true
    try {
      const { data: fetchData, total: fetchTotal } = await onFetch(
        Object.assign(
          {},
          { page: currentPage.value, pageSize: pageSize.value },
          filter,
        ),
      )
      list.value = reactive(fetchData)
      total.value = fetchTotal
    }
    catch (error) {
      list.value = []
      total.value = 0
    }
    finally {
      loading.value = false
    }
  }

  watch([currentPage, pageSize], () => {
    dispatchRequest()
  })

  onMounted(() => {
    immediate && dispatchRequest()
  })

  return {
    loading,
    list,
    total,
  }
}
