import type { ApiEndpoints } from '~/types/endpoint-response'

export const api_version = 'v1'

export const API_ENDPOINT: ApiEndpoints = {
  AUTH: {
    LOGIN: `/api/auth/login`,
  },
  USER: {
    ME: `/api/users/me`,
  },
  UOM: {
    FUEL: `/api/fuels`,
    MARK: `/api/marks`,
    TRANSMISSION: `/api/transmissions`,
    TYPE: `/api/types`,
  },
}
