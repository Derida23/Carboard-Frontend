import { API_ENDPOINT } from '~/constants/endpoint'
import type { ApiProductListResponse, ProductParams } from '~/types/responses/product-response'

export function useApiProduct() {
  const findAll = async (
    params: ProductParams,
    options?: Partial<ApiFetchOptions<ApiProductListResponse>>,
  ) => {
    return await useApi<ApiProductListResponse>(API_ENDPOINT.PRODUCT, {
      method: 'GET',
      params,
      ...options,
      onSuccess: ({ body }) => {
        body.data.forEach((product: any) => {
          product.name = capitalize(product.name)
          product.type.name = capitalize(product.type.name)
          product.transmission.name = capitalize(product.transmission.name)
          product.mark.name = capitalize(product.mark.name)
          product.fuel.name = capitalize(product.fuel.name)
        })
      },
    })
  }

  return {
    findAll,
  }
}
