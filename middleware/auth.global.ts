export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated } = storeToRefs(useAuthStore())

  const whitelist = [
    '/dashboard/auth/login',
  ]

  if (to.path.includes('/dashboard')) {
    if (!whitelist.some(p => new RegExp(`^${p}`).test(to.path))) {
      if (!isAuthenticated.value)
        return navigateTo('/dashboard/auth/login')
    }
    else {
      if (isAuthenticated.value)
        return navigateTo('/dashboard')
    }
  }
})
