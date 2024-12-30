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
  address: any
  avatar: any
  phone_number: any
  role: string
  created_at: string
  updated_at: string
  deleted_at: any
}

export type ApiMeResponse = SuccesMessage<MeResponse>
export type ApiUserListResponse = SuccesMessageList<UserData[]>
