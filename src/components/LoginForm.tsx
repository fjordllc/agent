'use client'

import { login } from "@/app/login/actions"
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react"

export function LoginForm() {
  return (
    <form style={{ width: '100%' }}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="full"
          formAction={login}
        >
          ログイン
        </Button>
      </VStack>
    </form>
  )
}
