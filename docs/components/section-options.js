import Working from "../assets/svgs/working.svg"

export default function SectionOptions({ props }) {
  return (
    <section className="section" id="options">
      <div className="inner">
        <h2 className="heading">{"Options"}</h2>
        <div className="card">
          <div
            className={"markdown"}
            dangerouslySetInnerHTML={{ __html: props.data.options }}
          />
        </div>
        <Working className="working" />
      </div>
    </section>
  )
}
