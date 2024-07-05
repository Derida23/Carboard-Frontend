import { API_ENDPOINT } from "~/constants/endpoint";
import type { ApiMeResponse } from "~/types/responses/user-response";

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref()
  const isAuthenticated = computed(() => !!user.value)

  const checkCredentials = async () => {
    return await useApi<ApiMeResponse>(API_ENDPOINT.USER.ME, {
      watch: false,
      deep: false,
      onSuccess: ({ body }) => {
        user.value = body.data
      },
    })
  }

  return {
    user,
    isAuthenticated,
    checkCredentials
  }
})