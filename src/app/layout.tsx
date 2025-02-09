import { ChakraProvider } from '@/components/ChakraProvider'
import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agent',
  description: 'Agent application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" data-theme="light">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.19/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com" async></script>
      </head>
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  )
}
