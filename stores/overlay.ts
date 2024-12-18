export const useOverlay = defineStore('overlay-store', () => {
  const overlay = ref(false)

  return {
    overlay,
  }
})
