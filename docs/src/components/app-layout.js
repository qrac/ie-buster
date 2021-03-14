import React from "react"
import { Helmet } from "react-helmet"

import AppFooter from "./app-footer"

import "../assets/css/theme-light.css"
import "../assets/css/theme-dark.css"
import "../assets/css/theme-variable.css"
import "../assets/css/styles.css"

import pjt from "../../project.json"

const site = pjt.site

export default function AppLayout({ children }) {
  return (
    <div className="app" id="app">
      <Helmet htmlAttributes={{ lang: "ja" }}>
        <title>{site.title + " - " + site.subTitle}</title>
        <meta name="description" content={site.description} />
        <meta
          property="og:title"
          content={site.title + " - " + site.subTitle}
        />
        <meta property="og:description" content={site.description} />
        <meta property="og:url" content={site.url} />
        <meta property="og:image" content={site.url + "/ogp.png"} />
        <meta
          property="og:site_name"
          content={site.title + " - " + site.subTitle}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={"@" + site.twitter.id} />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.png" />
        <script
          nomodule
          src="https://cdn.jsdelivr.net/npm/ie-buster@2.0.1/dist/ie-buster.min.js"
        />
        <script nomodule>ieBuster.init()</script>
      </Helmet>
      <main className="main" id="main">
        {children}
      </main>
      <AppFooter />
    </div>
  )
}
