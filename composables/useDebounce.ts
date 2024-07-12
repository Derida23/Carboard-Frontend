export function useDebounce<T>(value: Ref<T>, delay: number): Ref<T> {
  const state = ref(value.value) as Ref<T>

  function debounce(fn: (...args: any[]) => void, delay: number) {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn(...args), delay)
    }
  }

  const setDebouncedValue = debounce((newValue: T) => {
    state.value = newValue
  }, delay)

  watch(value, (newValue) => {
    setDebouncedValue(newValue)
  })

  return state
}
