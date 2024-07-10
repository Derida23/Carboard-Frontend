import { z } from 'zod'

const NameSchema = z
  .string()

const DescriptionSchema = z
  .string()

export const UomSchema = z.object({
  name: z.string(),
  description: z.string(),
})
