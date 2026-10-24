import pkg from "ie-buster/package.json"

import PageHomeHero from "../components/page/home/hero"
import ElementSection from "../components/element/section"
import ElementCard from "../components/element/card"
import CommonDocs from "../components/common/docs"

import { Svg } from "minista/assets"

import MdAbout from "../assets/markdown/about.mdx"
import MdQuickTest from "../assets/markdown/quick-test.mdx"
import MdCdn from "../assets/markdown/cdn.mdx"
import MdNpm from "../assets/markdown/npm.mdx"
import MdMethods from "../assets/markdown/methods.mdx"
import MdOptions from "../assets/markdown/options.mdx"
import MdWordpress from "../assets/markdown/wordpress.mdx"
import MdSupport from "../assets/markdown/support.mdx"

export const PageHome = () => {
  return (
    <>
      <PageHomeHero id="hero" />
      <ElementSection id="about" heading="About">
        <ElementCard>
          <CommonDocs>
            <MdAbout />
          </CommonDocs>
        </ElementCard>
      </ElementSection>
      <ElementSection id="quick-test" heading="Quick Test">
        <ElementCard>
          <CommonDocs>
            <MdQuickTest />
          </CommonDocs>
        </ElementCard>
      </ElementSection>
      <ElementSection id="how-to-use" heading="How To Use">
        <ElementCard>
          <CommonDocs>
            <MdCdn />
          </CommonDocs>
        </ElementCard>
        <ElementCard>
          <CommonDocs>
            <MdNpm />
          </CommonDocs>
        </ElementCard>
      </ElementSection>
      <ElementSection id="methods" heading="Methods">
        <ElementCard>
          <CommonDocs>
            <MdMethods />
          </CommonDocs>
        </ElementCard>
      </ElementSection>
      <ElementSection id="options" heading="Options">
        <ElementCard>
          <CommonDocs>
            <MdOptions />
          </CommonDocs>
        </ElementCard>
        <Svg src="/src/assets/svgs/working.svg" className="svg-working" />
      </ElementSection>
      <ElementSection id="wordpress" heading="WordPress">
        <ElementCard>
          <CommonDocs>
            <MdWordpress />
          </CommonDocs>
        </ElementCard>
      </ElementSection>
      <ElementSection id="support" heading="Support">
        <ElementCard
          endCover={
            <Svg src="/src/assets/svgs/grave.svg" className="svg-grave" />
          }
        >
          <CommonDocs>
            <MdSupport />
          </CommonDocs>
        </ElementCard>
      </ElementSection>
      <ElementSection id="license" heading={"License & Credit"}>
        <ElementCard>
          <p className="card-license-notes">
            <span>{"License: " + pkg.license}</span>
            {" / "}
            <span>
              {"Author: "}
              <a href={pkg.author.url}>{pkg.author.name}</a>
            </span>
            {" / "}
            <span>
              {"Illustration: "}
              <a href={pkg.illustration.url}>{pkg.illustration.name}</a>
            </span>
            {" / "}
            <span>
              {"Organization: "}
              <a href={pkg.organization.url}>{pkg.organization.name}</a>
            </span>
          </p>
        </ElementCard>
      </ElementSection>
    </>
  )
}

export default PageHome
