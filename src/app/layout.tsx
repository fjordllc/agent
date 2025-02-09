import { ChakraProvider } from '@/components/ChakraProvider'

export const metadata = {
  title: "Agent",
  description: "Agent application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
