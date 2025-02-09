'use client'

import { login } from "@/app/login/actions"
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, VStack, HStack, Text } from "@chakra-ui/react"
import Image from "next/image"

export default function LoginPage() {
  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="lg" py={{ base: 12, md: 24 }} px={{ base: 4, sm: 8 }}>
        <VStack spacing={8} alignItems="center">
          <HStack spacing={2}>
            <Image
              src="pjord.svg"
              width={32}
              height={32}
              alt="logo"
            />
            <Text fontSize="2xl" fontWeight="semibold">
              Fjord Agent
            </Text>
          </HStack>

          <Box w="full" bg="white" rounded="lg" shadow="base" p={{ base: 6, md: 8 }}>
            <VStack spacing={6}>
              <Heading as="h1" size="lg">
                ログイン
              </Heading>

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
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
