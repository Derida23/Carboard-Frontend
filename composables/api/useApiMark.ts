import { API_ENDPOINT } from '~/constants/endpoint'
import type { ApiUomListResponse, ApiUomResponse, UomPayload } from '~/types/responses/uom-response'

interface params {
  name?: string
  created_at?: Date
  end_at?: Date
  page?: number
}

export function useApiMark() {
  const findAll = async (
    params: params,
    options?: Partial<ApiFetchOptions<ApiUomListResponse>>,
  ) => {
    return await useApi<ApiUomListResponse>(API_ENDPOINT.UOM.MARK, {
      method: 'GET',
      params,
      ...options,
      // watch: false,
    })
  }

  const create = async (
    payload: UomPayload,
    options?: Partial<ApiFetchOptions<ApiUomResponse>>,
  ) => {
    return await useApi<ApiUomResponse>(API_ENDPOINT.UOM.MARK, {
      method: 'POST',
      body: payload,
      ...options,
      watch: false,
    })
  }

  const update = async (
    id: number,
    payload: UomPayload,
    options?: Partial<ApiFetchOptions<ApiUomResponse>>,
  ) => {
    return await useApi<ApiUomResponse>(`${API_ENDPOINT.UOM.MARK}/${id}`, {
      method: 'PATCH',
      body: payload,
      ...options,
      watch: false,
    })
  }

  const remove = async (
    id: number,
    options?: Partial<ApiFetchOptions<ApiUomResponse>>,
  ) => {
    return await useApi<ApiUomResponse>(`${API_ENDPOINT.UOM.MARK}/${id}`, {
      method: 'DELETE',
      ...options,
      watch: false,
    })
  }

  return { findAll, create, update, remove }
}
