export default function SectionMethods({ props }) {
  return (
    <section className="section" id="methods">
      <div className="inner">
        <h2 className="heading">{"Methods"}</h2>
        <div className="card">
          <div
            className={"markdown"}
            dangerouslySetInnerHTML={{ __html: props.data.methods }}
          />
        </div>
      </div>
    </section>
  )
}
