import '../styles/globals.scss'
import '../styles/marquee.scss'
import '../styles/button.scss'
import '../styles/animation.scss'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import {AnimatePresence} from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
  <AnimatePresence exitBeforeEnter>
    <Component {...pageProps} key={router.route} />
  </AnimatePresence>
  )
}

export default MyApp
