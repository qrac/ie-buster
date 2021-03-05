import React from "react"

import pjt from "../../project.json"

export default function SectionQuickTest() {
  return (
    <section className="section" id="quick-test">
      <div className="inner">
        <h2 className="heading">{"Quick Test"}</h2>
        <div className="card">
          <h3>
            <a href={pjt.site.quickTest.url}>{pjt.site.quickTest.name}</a>
          </h3>
        </div>
      </div>
    </section>
  )
}
