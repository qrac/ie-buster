import React from "react"

import LogoIllustration from "../assets/svgs/logo-illustration.svg"
import Logo from "../assets/svgs/logo.svg"

import ieBusterPkg from "ie-buster/package.json"
import pjt from "../../project.json"

export default function SectionHero() {
  return (
    <section className="hero" id="hero">
      <LogoIllustration className="logo-illustration" />
      <h1>
        <Logo className="logo" aria-label={pjt.site.title} />
      </h1>
      <h2 className="ribbon">{pjt.site.shortDescription}</h2>
      <p className="repo-note">
        <span>v{ieBusterPkg.version}</span>
        <span>{" / "}</span>
        <span>{ieBusterPkg.license}</span>
        <span>{" / "}</span>
        <a href={ieBusterPkg.repository.url}>Repository</a>
        <span>{" / "}</span>
        <a href={ieBusterPkg.repository.url + "/releases"}>Releases</a>
      </p>
    </section>
  )
}
