import "../styles/globals.css"
import ieBuster from "../../../lib/esm"

function MyApp({ Component, pageProps }) {
  process.browser && ieBuster.create()
  return <Component {...pageProps} />
}

export default MyApp
