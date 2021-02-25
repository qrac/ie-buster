import ieBusterPkg from "ie-buster/package.json"
import pjt from "../project.json"

export default function SectionHero() {
  return (
    <section className="hero" id="hero">
      <img
        className="logo-illustration"
        src="/svgs/logo-illustration.svg"
        alt="IE Buster Illust"
      />
      <h1>
        <img className="logo" src="/svgs/logo.svg" alt={pjt.site.title} />
      </h1>
      <h2 className="ribbon">{pjt.site.shortDescription}</h2>
      <p className="repo-note">
        <span>v{ieBusterPkg.version}</span>
        <span>{" / "}</span>
        <span>{ieBusterPkg.license}</span>
        <span>{" / "}</span>
        <a href={ieBusterPkg.repository}>Repository</a>
        <span>{" / "}</span>
        <a href={ieBusterPkg.repository + "/releases"}>Releases</a>
      </p>
    </section>
  )
}
