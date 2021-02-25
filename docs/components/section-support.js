export default function SectionSupport({ props }) {
  return (
    <section className="section" id="support">
      <div className="inner">
        <h2 className="heading">{"Support"}</h2>
        <div className="card">
          <div
            className={"markdown"}
            dangerouslySetInnerHTML={{ __html: props.data.support }}
          />
          <div className="grave-wrap">
            <img className="grave" src="/svgs/grave.svg" alt="Grave" />
          </div>
        </div>
      </div>
    </section>
  )
}
