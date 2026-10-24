import type { LayoutProps } from "minista/types"
import CommonFooter from "../components/common/footer"
import pjt from "../../project.json"
import "./globals.css"
import "./style.css"

export default function Layout({
  title,
  url,
  noindex,
  children,
}: LayoutProps & { noindex?: boolean }) {
  const { site } = pjt
  const pageTitle = title
    ? `${title} - ${site.title}`
    : `${site.title} - ${site.subTitle}`
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta name="description" content={site.description} />
        <link rel="canonical" href={site.url + url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={site.description} />
        <meta property="og:url" content={site.url + url} />
        <meta property="og:image" content={site.url + "/ogp.png"} />
        <meta property="og:site_name" content={site.title} />
        <meta
          property="og:type"
          content={url === "/" ? "website" : "article"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={"@" + site.twitter.id} />
        {noindex && <meta name="robots" content="noindex" />}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="layout">
        <main className="main">{children}</main>
        <CommonFooter
          copyrightSince={site.copyright.since}
          copyrightHolder={site.copyright.holder}
          copyrightUrl={site.copyright.url}
        />
        <script src="/ie-buster/ie-buster.min.js" />
        <script dangerouslySetInnerHTML={{ __html: "ieBuster.init()" }} />
      </body>
    </html>
  )
}
