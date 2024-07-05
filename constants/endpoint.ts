import type { ApiEndpoints } from "~/types/endpoint-response"

export const api_version = 'v1'

export const API_ENDPOINT: ApiEndpoints = {
  AUTH: {
    LOGIN: `/api/auth/login`,
  },
}
