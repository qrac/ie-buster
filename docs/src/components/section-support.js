import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Grave from "../assets/svgs/grave.svg"

export default function SectionSupport() {
  const data = useStaticQuery(graphql`
    query SectionSupportQuery {
      support: file(absolutePath: { regex: "/support.md/" }) {
        childrenMarkdownRemark {
          html
        }
      }
    }
  `)
  return (
    <section className="section" id="support">
      <div className="inner">
        <h2 className="heading">{"Support"}</h2>
        <div className="card">
          <div
            className={"markdown"}
            dangerouslySetInnerHTML={{
              __html: data.support.childrenMarkdownRemark[0].html,
            }}
          />
          <div className="grave-wrap">
            <Grave className="grave" />
          </div>
        </div>
      </div>
    </section>
  )
}
