'use client'

import { ChakraProvider as Provider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { createStandaloneToast } from '@chakra-ui/toast'

const { ToastContainer } = createStandaloneToast()

interface Props {
  children: ReactNode
}

export function ChakraProvider({ children }: Props) {
  return (
    <>
      <Provider>
        {children}
      </Provider>
      <ToastContainer />
    </>
  )
}
