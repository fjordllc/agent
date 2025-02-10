'use client'

import { signup } from "@/app/signup/actions"
import { signupSchema, type SignupFormData } from "@/schemas/auth"
import { SignupErrorCode } from "./types"
import Image from "next/image"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const toast = useToast()

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    
    const response = await signup(formData)
    
    if (response.error) {
      switch (response.error.code) {
        case SignupErrorCode.ValidationError:
        case SignupErrorCode.EmailTaken:
          if (response.error.field) {
            setError(response.error.field as keyof SignupFormData, {
              message: response.error.message,
            })
          }
          break
        case SignupErrorCode.ServerError:
          toast({
            title: "エラー",
            description: response.error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          })
          break
      }
      return
    }
  })

  return (
    <Container maxW="md" py={{ base: 8, md: 20 }}>
      <VStack spacing={8}>
        <Flex align="center" gap={3}>
          <Image
            src="/pjord.svg"
            width={32}
            height={32}
            alt="logo"
          />
          <Heading size="lg">Fjord Agent</Heading>
        </Flex>

        <Box w="full" bg="white" p={8} borderRadius="lg" boxShadow="sm">
          <VStack spacing={6}>
            <Heading size="md" w="full">
              サインアップ
            </Heading>

            <form onSubmit={onSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    {...register('email')}
                  />
                  <FormErrorMessage>
                    {errors.email?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    {...register('password')}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  w="full"
                  isLoading={isSubmitting}
                >
                  サインアップ
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
