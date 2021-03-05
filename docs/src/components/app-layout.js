import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import ieBuster from "ie-buster"

import AppFooter from "./app-footer"

import "@fontsource/m-plus-rounded-1c/500.css"
import "@fontsource/m-plus-rounded-1c/700.css"
import "yakuhanjp/dist/css/yakuhanrp_s.css"

import "../assets/css/theme-light.css"
import "../assets/css/theme-dark.css"
import "../assets/css/theme-variable.css"
import "../assets/css/styles.css"

import pjt from "../../project.json"

const site = pjt.site

export default function AppLayout({ children }) {
  useEffect(() => {
    ieBuster.init()
  })
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
      </Helmet>
      <main className="main" id="main">
        {children}
      </main>
      <AppFooter />
    </div>
  )
}
