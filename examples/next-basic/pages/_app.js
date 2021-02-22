import "../styles/globals.css"
import ieBuster from "../../../dist/ie-buster.common"

function MyApp({ Component, pageProps }) {
  process.browser && ieBuster.create()
  return <Component {...pageProps} />
}

export default MyApp
