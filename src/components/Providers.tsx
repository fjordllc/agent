'use client'

import { ReactNode } from 'react'
import { createStandaloneToast } from '@chakra-ui/toast'

const { ToastContainer } = createStandaloneToast()

interface Props {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}
