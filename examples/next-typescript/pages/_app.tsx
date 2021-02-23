import { AppProps } from "next/app"
import ieBuster from "ie-buster"

export default function MyApp({ Component, pageProps }: AppProps) {
  //process.browser && ieBuster.check()
  process.browser &&
    ieBuster.create({
      mainText: "test",
      linkStyles: { backgroundColor: "purple" },
    })
  //process.browser && ieBuster.remove()
  //process.browser && ieBuster.init()
  return <Component {...pageProps} />
}
