import type { ApiFetchOptions } from '../useApi'
import { API_ENDPOINT } from '~/constants/endpoint'
import type { ApiLoginResponse, LoginPayload } from '~/types/responses/auth-response'

export function useApiAuth() {
  const onSign = async (
    payload: LoginPayload,
    options?: Partial<ApiFetchOptions<ApiLoginResponse>>,
  ) => {
    return await useApi<ApiLoginResponse>(API_ENDPOINT.AUTH.LOGIN, {
      method: 'POST',
      body: { ...payload },
      ...options,
    })
  }

  return { onSign }
}
