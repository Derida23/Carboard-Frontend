import type { SuccesMessage, SuccesMessageList } from '..'

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

export interface UserData {
  id: number
  name: string
  email: string
  address: string
  avatar: string
  phone_number: string
  role: 'admin' | 'user'
  created_at: Date
  updated_at: Date
  deleted_at: Date | undefined
}

export type ApiMeResponse = SuccesMessage<MeResponse>
export type ApiUserListResponse = SuccesMessageList<UserData[]>
