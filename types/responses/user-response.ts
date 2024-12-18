import type { SuccesMessage } from '..'

export interface MeResponse {
  id: number
  name: string
  email: string
  address: string | undefined
  avatar: string | undefined
  phone_number: string | undefined
  role: 'admin' | 'user'
  created_at: Date
  updated_at: Date
  deleted_at: Date | undefined
}

export type ApiMeResponse = SuccesMessage<MeResponse>
