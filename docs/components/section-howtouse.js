export default function SectionHowToUse({ props }) {
  return (
    <section className="section" id="how-to-use">
      <div className="inner">
        <h2 className="heading">{"How To Use"}</h2>
        <div className="card">
          <div
            className={"markdown"}
            dangerouslySetInnerHTML={{ __html: props.data.cdn }}
          />
        </div>
        <div className="card">
          <div
            className={"markdown"}
            dangerouslySetInnerHTML={{ __html: props.data.npm }}
          />
        </div>
      </div>
    </section>
  )
}
