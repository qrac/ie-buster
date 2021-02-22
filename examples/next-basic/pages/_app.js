import "../styles/globals.css"
import ieBuster from "ie-buster"

function MyApp({ Component, pageProps }) {
  process.browser && ieBuster.create()
  return <Component {...pageProps} />
}

export default MyApp
