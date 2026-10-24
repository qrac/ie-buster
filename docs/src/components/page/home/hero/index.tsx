import pkg from "ie-buster/package.json"

import "./style.css"
import pjt from "../../../../../project.json"
import { Svg } from "minista/assets"

import type { Props } from "./props"

const PageHomeHero = ({ id }: Props) => {
  const site = pjt.site
  return (
    <section className="hero" id={id}>
      <Svg src="/src/assets/svgs/logo-icon.svg" className="svg-logo-icon" />
      <h1>
        <Svg
          src="/src/assets/svgs/logo-text.svg"
          className="svg-logo-text"
          aria-label={site.title}
        />
      </h1>
      <h2 className="hero-ribbon">{site.shortDescription}</h2>
      <p className="hero-note">
        <span>v{pkg.version}</span>
        <span>{" / "}</span>
        <span>{pkg.license}</span>
        <span>{" / "}</span>
        <a href={site.github.url}>Repository</a>
        <span>{" / "}</span>
        <a href={site.github.url + "/releases"}>Releases</a>
      </p>
    </section>
  )
}

export default PageHomeHero
