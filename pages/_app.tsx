import '../styles/globals.scss'
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {
        Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) :
          <Component {...pageProps} />
      }
    </SessionProvider >
  )
}

function Auth({ children }) {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children;
}
