import "./style.css"

import type { Props } from "./props"

const ElementCard = ({ children, endCover }: Props) => {
  return (
    <div className="card">
      {children}
      {endCover && <div className="card-end-cover">{endCover}</div>}
    </div>
  )
}

export default ElementCard
