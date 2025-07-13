import type { SuccesMessage, SuccesMessageList } from '..'
import type { UomData } from './uom-response'

export interface ProductParams {
  name?: string
  id_fuel?: string | undefined
  id_mark?: string | undefined
  id_transmission?: string | undefined
  id_type?: string | undefined
}

export interface ProductData {
  id: number
  name: string
  description: string
  id_type: number
  id_mark: number
  price: number
  seat: number
  id_transmission: number
  id_fuel: number
  image: string
  created_at: string
  updated_at: string
  deleted_at: string | undefined
  type: UomData
  mark: UomData
  transmission: UomData
  fuel: UomData
}

export interface ProductPayload {
  name: string | undefined
  description: string | undefined
  id_type: number | undefined
  id_mark: number | undefined
  price: number | undefined
  seat: number | undefined
  id_transmission: number | undefined
  id_fuel: number | undefined
  image: File | undefined
}

export type ApiProductListResponse = SuccesMessageList<ProductData[]>
export type ApiProductResponse = SuccesMessage<ProductData>
