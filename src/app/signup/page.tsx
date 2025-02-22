'use client'

import { signup } from '@/app/signup/actions'
import { useRouter } from 'next/navigation'
import { signupSchema, type SignupFormData } from '@/schemas/auth'
import { SignupErrorCode } from './types'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export default function SignupPage() {
  const router = useRouter()
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { toast } = useToast()

  const onSubmit = async (data: SignupFormData) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    const response = await signup(formData)

    if (response.error) {
      switch (response.error.code) {
        case SignupErrorCode.ValidationError:
        case SignupErrorCode.EmailTaken:
          if (response.error.field) {
            form.setError(response.error.field as keyof SignupFormData, {
              message: response.error.message,
            })
          }
          break
        case SignupErrorCode.ServerError:
          toast({
            title: 'エラー',
            description: response.error.message,
            variant: 'destructive',
          })
          break
      }
      return
    }

    toast({
      title: '認証メール送付',
      description:
        '認証メールを送りました。メール内のURLをクリックし、サインアップを完了してください。',
    })

    router.push('/')
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-center">
              <Image
                className="w-8 h-8 mr-2"
                src="/pjord.svg"
                width={32}
                height={32}
                alt="logo"
              />
              <CardTitle>Fjord Agent</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-5 py-2.5"
                  disabled={form.formState.isSubmitting}
                >
                  サインアップ
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
