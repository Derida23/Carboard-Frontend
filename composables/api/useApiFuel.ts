import { API_ENDPOINT } from '~/constants/endpoint'

export function useApiFuel() {
  const findAll = async (
    options?: Partial<ApiFetchOptions<any>>,
  ) => {
    return await useApi<any>(API_ENDPOINT.UOM.FUEL, {
      method: 'GET',
      ...options,
      watch: false,
    })
  }

  const create = async (
    payload: any,
    options?: Partial<ApiFetchOptions<any>>,
  ) => {
    return await useApi<any>(API_ENDPOINT.UOM.FUEL, {
      method: 'POST',
      body: payload,
      ...options,
      watch: false,
    })
  }

  const update = async (
    payload: any,
    options?: Partial<ApiFetchOptions<any>>,
  ) => {
    return await useApi<any>(`${API_ENDPOINT.UOM.FUEL}/${payload.id}`, {
      method: 'PATCH',
      body: payload,
      ...options,
      watch: false,
    })
  }

  const remove = async (
    id: any,
    options?: Partial<ApiFetchOptions<any>>,
  ) => {
    return await useApi<any>(`${API_ENDPOINT.UOM.FUEL}/${id}`, {
      method: 'DELETE',
      ...options,
      watch: false,
    })
  }

  return { findAll, create, update, remove }
}
