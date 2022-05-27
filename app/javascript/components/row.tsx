import * as React from "react"
import Seat from "./seat"

interface RowProps {
  rowNumber: number
  seatsPerRow: number
}

const Row = ({ rowNumber, seatsPerRow }: RowProps): React.ReactElement => {
  const seatItems = Array.from(Array(seatsPerRow).keys()).map(
    (i: number): React.ReactElement => {
      return <Seat key={`seat-${i}`} initialState="unsold" seatNumber={i} />
    }
  )

  return <tr key={`seat-row-${rowNumber}`}>{seatItems}</tr>
}

export default Row
