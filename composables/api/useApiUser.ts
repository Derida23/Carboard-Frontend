import { API_ENDPOINT } from '~/constants/endpoint'
import type { UserPayload } from '~/types/payloads/user-payload'
import type { ApiUserListResponse } from '~/types/responses/user-response'

interface params {
  name?: string
  created_at?: Date
  end_at?: Date
  page?: number
}

export function useApiUser() {
  const findAll = async (
    params: params,
    options?: Partial<ApiFetchOptions<ApiUserListResponse>>,
  ) => {
    return await useApi<ApiUserListResponse>(API_ENDPOINT.USER.ALL, {
      method: 'GET',
      params,
      ...options,
      onSuccess: () => {
      },
      onError: () => {
      },
    })
  }

  const update = async (
    id: number,
    payload: UserPayload,
    options?: Partial<ApiFetchOptions<ApiUserListResponse>>,
  ) => {
    return await useApi<ApiUserListResponse>(`${API_ENDPOINT.USER.ALL}/${id}`, {
      method: 'PATCH',
      body: payload,
      ...options,
      watch: false,
    })
  }

  const remove = async (
    id: number,
    options?: Partial<ApiFetchOptions<ApiUserListResponse>>,
  ) => {
    return await useApi<ApiUserListResponse>(`${API_ENDPOINT.USER.ALL}/${id}`, {
      method: 'DELETE',
      ...options,
      watch: false,
    })
  }
  return {
    findAll,
    update,
    remove,
  }
}
