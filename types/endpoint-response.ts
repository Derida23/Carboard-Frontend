interface AuthEndpoints {
  LOGIN: string
}

interface UserEndpoints {
  ME: string
}

interface UomEndpoints {
  FUEL: string
  MARK: string
  TRANSMISSION: string
  TYPE: string
}
export interface ApiEndpoints {
  AUTH: AuthEndpoints
  USER: UserEndpoints
  UOM: UomEndpoints
}
