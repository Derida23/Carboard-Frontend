import { API_ENDPOINT } from '~/constants/endpoint'
import type { ApiUomListResponse, ApiUomResponse, UomPayload } from '~/types/responses/uom-response'

export function useApiFuel() {
  const findAll = async (
    options?: Partial<ApiFetchOptions<ApiUomListResponse>>,
  ) => {
    return await useApi<ApiUomListResponse>(API_ENDPOINT.UOM.FUEL, {
      method: 'GET',
      ...options,
      watch: false,
    })
  }

  const create = async (
    payload: UomPayload,
    options?: Partial<ApiFetchOptions<ApiUomResponse>>,
  ) => {
    return await useApi<ApiUomResponse>(API_ENDPOINT.UOM.FUEL, {
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
    return await useApi<ApiUomResponse>(`${API_ENDPOINT.UOM.FUEL}/${id}`, {
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
    return await useApi<ApiUomResponse>(`${API_ENDPOINT.UOM.FUEL}/${id}`, {
      method: 'DELETE',
      ...options,
      watch: false,
    })
  }

  return { findAll, create, update, remove }
}
