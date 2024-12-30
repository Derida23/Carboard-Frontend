export const useGlobalStore = defineStore('global-store', () => {
  const overlay = ref(false)

  const route = useRoute()
  const feature = computed (() => {
    return route.path.split('/').pop()
  })

  return {
    overlay,
    feature,
  }
})
