import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  seat: z.number(),
  id_type: z.number(),
  id_mark: z.number(),
  id_transmission: z.number(),
  id_fuel: z.number(),
})
