import { ChakraProvider as Provider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Providers } from './Providers'

interface Props {
  children: ReactNode
}

export function ChakraProvider({ children }: Props) {
  return (
    <Provider>
      <Providers>{children}</Providers>
    </Provider>
  )
}
