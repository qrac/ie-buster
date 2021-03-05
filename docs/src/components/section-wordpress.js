import React from "react"
import { StaticImage } from "gatsby-plugin-image"

export default function SectionWordPress() {
  return (
    <section className="section" id="wordpress">
      <div className="inner">
        <h2 className="heading">{"WordPress"}</h2>
        <div className="card">
          <StaticImage
            src="../assets/images/wp-plugin.png"
            width={1508}
            height={496}
            alt="WP IE Buster 検索画面"
          />
          <p>
            <a href="https://wordpress.org/plugins/wp-ie-buster/">
              {"WP IE Buster"}
            </a>
            <span>{" として WordPress プラグインをリリースしました 🎉"}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
