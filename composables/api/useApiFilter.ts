import { API_ENDPOINT } from '~/constants/endpoint'
import type { ApiFilterResponse } from '~/types/responses/filter-response'

export function useApiFilter() {
  const findAll = async (
    options?: Partial<ApiFetchOptions<ApiFilterResponse>>,
  ) => {
    return await useApi<ApiFilterResponse>(API_ENDPOINT.FILTER, {
      method: 'GET',
      ...options,
      onSuccess: ({ body }) => {
        body.data.fuels.forEach((filter) => {
          filter.name = capitalize(filter.name)
        })
        body.data.marks.forEach((filter) => {
          filter.name = capitalize(filter.name)
        })
        body.data.transmissions.forEach((filter) => {
          filter.name = capitalize(filter.name)
        })
        body.data.types.forEach((filter) => {
          filter.name = capitalize(filter.name)
        })
      },
    })
  }

  return {
    findAll,
  }
}
