import "./style.css"

import type { Props } from "./props"

const CommonDocs = ({ children }: Props) => {
  return <section className="docs">{children}</section>
}

export default CommonDocs
