import type { SuccesMessageList } from '..'
import type { UomData } from './uom-response'

export interface FilterData {
  types: UomData[]
  marks: UomData[]
  transmissions: UomData[]
  fuels: UomData[]
}

export type ApiFilterResponse = SuccesMessageList<FilterData>
