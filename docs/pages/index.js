import fs from "fs"
import markdownToHtml from "../functions/markdownToHtml"

import SectionHero from "../components/section-hero"
import SectionAbout from "../components/section-about"
import SectionQuickTest from "../components/section-quicktest"
import SectionHowToUse from "../components/section-howtouse"
import SectionMethods from "../components/section-methods"
import SectionOptions from "../components/section-options"
import SectionWordPress from "../components/section-wordpress"
import SectionSupport from "../components/section-support"
import SectionLicense from "../components/section-license"

export default function Home(props) {
  return (
    <main className="main" id="main">
      <SectionHero />
      <SectionAbout />
      <SectionQuickTest />
      <SectionHowToUse props={props} />
      <SectionMethods props={props} />
      <SectionOptions props={props} />
      <SectionWordPress />
      <SectionSupport props={props} />
      <SectionLicense />
    </main>
  )
}

export const getStaticProps = async () => {
  const cdn = await markdownToHtml(
    fs.readFileSync(process.cwd() + "/data/cdn.md", "utf8")
  )
  const npm = await markdownToHtml(
    fs.readFileSync(process.cwd() + "/data/npm.md", "utf8")
  )
  const methods = await markdownToHtml(
    fs.readFileSync(process.cwd() + "/data/methods.md", "utf8")
  )
  const options = await markdownToHtml(
    fs.readFileSync(process.cwd() + "/data/options.md", "utf8")
  )
  const support = await markdownToHtml(
    fs.readFileSync(process.cwd() + "/data/support.md", "utf8")
  )
  return {
    props: {
      data: {
        cdn: cdn,
        npm: npm,
        methods: methods,
        options: options,
        support: support,
      },
    },
  }
}
