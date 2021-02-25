import ieBusterPkg from "ie-buster/package.json"

export default function SectionAbout() {
  return (
    <section className="section" id="about">
      <div className="inner">
        <h2 className="heading">{"About"}</h2>
        <div className="card">
          <img
            src="/images/about.png"
            width={1366}
            height={400}
            alt="IE Buster プレビュー"
          />
          <p>
            <span>
              {
                "IE Buster（アイイーバスター）は、IEユーザーにChromeを促す軽量なポップアップJSです。Web制作者みんなを救うために開発しました。"
              }
            </span>
            <a href={ieBusterPkg.repository + "#about"}>{"（ → 詳細 ）"}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
