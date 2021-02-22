import { AppProps } from "next/app"
import ieBuster from "../../../lib/esm"

export default function MyApp({ Component, pageProps }: AppProps) {
  process.browser && ieBuster.create()
  return <Component {...pageProps} />
}
