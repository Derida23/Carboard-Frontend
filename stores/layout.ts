export const useLayoutStore = defineStore('layout-store', () => {
  const sidenavCollapsed = ref(false)

  const toggleSideNav = async () => {
    sidenavCollapsed.value = !sidenavCollapsed.value
  }

  return {
    toggleSideNav,
    sidenavCollapsed,
  }
})
