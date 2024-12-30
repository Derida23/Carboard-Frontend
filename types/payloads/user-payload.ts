export interface UserPayload {
  id?: number
  name: string
  email: string
  address?: string
  avatar?: string
  phone_number?: string
  role: Role
}

export type Role = 'user' | 'admin'
