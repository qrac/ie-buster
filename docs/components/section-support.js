import Grave from "../assets/svgs/grave.svg"

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
          <Grave className="grave" />
        </div>
      </div>
    </section>
  )
}
