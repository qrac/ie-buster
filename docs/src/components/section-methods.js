import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function SectionMethods() {
  const data = useStaticQuery(graphql`
    query SectionMethodsQuery {
      methods: file(absolutePath: { regex: "/methods.md/" }) {
        childrenMarkdownRemark {
          html
        }
      }
    }
  `)
  return (
    <section className="section" id="methods">
      <div className="inner">
        <h2 className="heading">{"Methods"}</h2>
        <div className="card">
          <div
            className={"markdown"}
            dangerouslySetInnerHTML={{
              __html: data.methods.childrenMarkdownRemark[0].html,
            }}
          />
        </div>
      </div>
    </section>
  )
}
