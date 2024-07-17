import { API_ENDPOINT } from '~/constants/endpoint'
import type { ApiFilterResponse } from '~/types/responses/filter-response'

export function useApiFilter() {
  const findAll = async (
    options?: Partial<ApiFetchOptions<ApiFilterResponse>>,
  ) => {
    return await useApi<ApiFilterResponse>(API_ENDPOINT.FILTER, {
      method: 'GET',
      ...options,
    })
  }

  return {
    findAll,
  }
}
