import React from "react"

import ieBusterPkg from "ie-buster/package.json"

export default function SectionLicense() {
  return (
    <section className="section" id="license">
      <div className="inner">
        <h2 className="heading">{"License & Credit"}</h2>
        <div className="card">
          <p className="license-notes">
            <span>{"License: " + ieBusterPkg.license}</span>
            {" / "}
            <span>
              {"Author: "}
              <a href={ieBusterPkg.author.url}>{ieBusterPkg.author.name}</a>
            </span>
            {" / "}
            <span>
              {"Illustration: "}
              <a href={ieBusterPkg.illustration.url}>
                {ieBusterPkg.illustration.name}
              </a>
            </span>
            {" / "}
            <span>
              {"Organization: "}
              <a href={ieBusterPkg.organization.url}>
                {ieBusterPkg.organization.name}
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
