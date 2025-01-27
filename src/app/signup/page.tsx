"use client";

import { signup } from "@/app/signup/actions";
import { useRouter } from "next/navigation";
import { signupSchema, type SignupFormData } from "@/schemas/auth";
import { SignupErrorCode } from "./types";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const router = useRouter();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: SignupFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const response = await signup(formData);

    if (response.error) {
      switch (response.error.code) {
        case SignupErrorCode.ValidationError:
        case SignupErrorCode.EmailTaken:
          if (response.error.field) {
            form.setError(response.error.field as keyof SignupFormData, {
              message: response.error.message,
            });
          }
          break;
        case SignupErrorCode.ServerError:
          toast({
            title: "エラー",
            description: response.error.message,
            variant: "destructive",
          });
          break;
      }
      return;
    }

    toast({
      title: "認証メール送付",
      description:
        "認証メールを送りました。メール内のURLをクリックし、サインアップを完了してください。",
    });

    router.push("/");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image
            className="w-8 h-8 mr-2"
            src="pjord.svg"
            width="32"
            height="32"
            alt="logo"
          />
          Fjord Agent
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>サインアップ</CardTitle>
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
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  サインアップ
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
