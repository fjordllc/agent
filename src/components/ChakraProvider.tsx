import { ChakraProvider as Provider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { ChakraClientProvider } from './ChakraClientProvider'

interface Props {
  children: ReactNode
}

export function ChakraProvider({ children }: Props) {
  return (
    <Provider>
      <ChakraClientProvider>{children}</ChakraClientProvider>
    </Provider>
  )
}
