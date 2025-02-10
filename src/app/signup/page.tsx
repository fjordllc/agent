import { signup } from "@/app/signup/actions";
import Image from "next/image";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Flex,
} from '@chakra-ui/react'

export default function SignupPage() {
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

            <form style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    required
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  w="full"
                  formAction={signup}
                >
                  サインアップ
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
