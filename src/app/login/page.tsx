import { Box, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"
import { LoginForm } from "@/components/LoginForm"

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
              <LoginForm />
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
