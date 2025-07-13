import type { SuccesMessage, SuccesMessageList } from '..'

export interface UomData {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface UomPayload {
  name: string
  description: string
}

export type ApiUomListResponse = SuccesMessageList<UomData[]>
export type ApiUomResponse = SuccesMessage<UomData>
