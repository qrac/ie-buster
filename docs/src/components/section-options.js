import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Working from "../assets/svgs/working.svg"

export default function SectionOptions() {
  const data = useStaticQuery(graphql`
    query SectionOptionsQuery {
      options: file(absolutePath: { regex: "/options.md/" }) {
        childrenMarkdownRemark {
          html
        }
      }
    }
  `)
  return (
    <section className="section" id="options">
      <div className="inner">
        <h2 className="heading">{"Options"}</h2>
        <div className="card">
          <div
            className={"markdown"}
            dangerouslySetInnerHTML={{
              __html: data.options.childrenMarkdownRemark[0].html,
            }}
          />
        </div>
        <Working className="working" />
      </div>
    </section>
  )
}
