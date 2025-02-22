import { z } from 'zod'

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'メールアドレスは必須です' })
    .email({ message: '正しいメールアドレスを入力してください' }),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上である必要があります' }),
})

export type SignupFormData = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'メールアドレスは必須です' })
    .email({ message: '正しいメールアドレスを入力してください' }),
  password: z.string().min(1, { message: 'パスワードは必須です' }),
})

export type LoginFormData = z.infer<typeof loginSchema>
