import React from "react"

import ieBusterPkg from "ie-buster/package.json"
import pjt from "../../project.json"

const copylight = pjt.site.copylight
const nowYear = new Date().getFullYear()

export default function AppFooter() {
  return (
    <footer className="footer">
      <p className="copylight">
        {"©️ "}
        <a href={ieBusterPkg.organization.url}>
          {ieBusterPkg.organization.name}
        </a>
        {` ${copylight.startYear} - ${nowYear}`}
      </p>
    </footer>
  )
}
