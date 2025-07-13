import { z } from 'zod'

export const UomSchema = z.object({
  name: z.string(),
  description: z.string(),
})
