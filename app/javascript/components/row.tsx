import * as React from "react"
import Seat from "./seat"

interface RowProps {
  rowNumber: number
  seatsPerRow: number
}

const Row = (props: RowProps): React.ReactElement => {
  const seatItems = Array.from(Array(props.seatsPerRow).keys()).map(
    (i: number): React.ReactElement => {
      return <Seat key={`seat-${i}`} initialState="unsold" seatNumber={i} />
    }
  )

  return <tr key={`seat-row-${props.rowNumber}`}>{seatItems}</tr>
}

export default Row
