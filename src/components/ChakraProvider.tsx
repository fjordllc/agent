'use client'

import React from 'react'
import { ChakraProvider as ChakraUIProvider } from '@chakra-ui/react'

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraUIProvider>{children}</ChakraUIProvider>
}
