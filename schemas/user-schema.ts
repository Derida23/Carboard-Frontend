import { z } from 'zod'

const Role = z.union([z.literal('user'), z.literal('admin')])

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: Role,
})
