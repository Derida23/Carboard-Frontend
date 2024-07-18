import { API_ENDPOINT } from '~/constants/endpoint'
import type { ApiProductListResponse, ProductData, ProductParams, ProductPayload } from '~/types/responses/product-response'

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
        body.data.forEach((product: ProductData) => {
          product.name = capitalize(product.name)
          product.type.name = capitalize(product.type.name)
          product.transmission.name = capitalize(product.transmission.name)
          product.mark.name = capitalize(product.mark.name)
          product.fuel.name = capitalize(product.fuel.name)
        })
      },
    })
  }

  const create = async (
    payload: ProductPayload,
    options?: Partial<ApiFetchOptions<ApiProductListResponse>>,
  ) => {
    const formData = new FormData()

    if (payload.image) {
      formData.append('image', payload.image)
    }

    const formdata = {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      seat: payload.seat,
      id_type: payload.id_type,
      id_mark: payload.id_mark,
      id_transmission: payload.id_transmission,
      id_fuel: payload.id_fuel,
    }

    for (const key in formdata) {
      if (formdata[key as keyof typeof formdata] !== undefined) {
        formData.append(key, formdata[key as keyof typeof formdata] as string | Blob)
      }
    }

    return await useApi<ApiProductListResponse>(API_ENDPOINT.PRODUCT, {
      method: 'POST',
      body: formData,
      ...options,
      watch: false,
    })
  }

  return {
    findAll,
    create,
  }
}
