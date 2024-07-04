import { API_ENDPOINT } from "~/constants/endpoint"

export function useApiAuth() {
  const onSign = async (payload: any, options?: any) => {
    return await useApi<any>(API_ENDPOINT.AUTH.LOGIN, {
      method: 'POST',
      body: { ...payload },
      ...options
    })
  }

  return {onSign}
}
