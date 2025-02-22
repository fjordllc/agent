import type { AppPropsWithLayout } from 'next/app'
import '../../styles/globals.css'
import Multi from '../components/layouts/MulitLayout'
import { UserProvider } from '../contexts/UserProvider'
import { ReactElement } from 'react'

function determinLayout({
  Component,
  pageProps,
}: AppPropsWithLayout): ReactElement {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  } else {
    return (
      <Multi>
        <Component {...pageProps} />
      </Multi>
    )
  }
}

export default function App(props: AppPropsWithLayout) {
  return <UserProvider>{determinLayout(props)}</UserProvider>
}
