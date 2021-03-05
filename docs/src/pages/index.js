import React from "react"

import AppLayout from "../components/app-layout"
import SectionHero from "../components/section-hero"
import SectionAbout from "../components/section-about"
import SectionQuickTest from "../components/section-quicktest"
import SectionHowToUse from "../components/section-howtouse"
import SectionMethods from "../components/section-methods"
import SectionOptions from "../components/section-options"
import SectionWordPress from "../components/section-wordpress"
import SectionSupport from "../components/section-support"
import SectionLicense from "../components/section-license"

export default function Home() {
  return (
    <AppLayout>
      <SectionHero />
      <SectionAbout />
      <SectionQuickTest />
      <SectionHowToUse />
      <SectionMethods />
      <SectionOptions />
      <SectionWordPress />
      <SectionSupport />
      <SectionLicense />
    </AppLayout>
  )
}
