import type { ApiEndpoints } from '~/types/endpoint-response'

export const api_version = 'v1'

export const API_ENDPOINT: ApiEndpoints = {
  AUTH: {
    LOGIN: `/api/auth/login`,
    REGISTER: `/api/auth/register`,
  },
  USER: {
    ME: `/api/users/me`,
    ALL: `/api/users`,
  },
  UOM: {
    FUEL: `/api/fuels`,
    MARK: `/api/marks`,
    TRANSMISSION: `/api/transmissions`,
    TYPE: `/api/types`,
  },
  PRODUCT: '/api/products',
  FILTER: '/api/filters',
}
