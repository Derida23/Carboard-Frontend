import { z } from 'zod'

const PasswordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long' })
  .max(50, { message: 'Password must be less than 50 characters' })
  .trim()

const EmailSchema = z
  .string()
  .min(6, { message: 'Email is required' })
  .max(50, { message: 'Email must be less than 50 characters' })
  .email({ message: 'Not a valid email' })
  .trim()
  .toLowerCase()

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
})
