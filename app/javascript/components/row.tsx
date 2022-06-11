import * as React from "react"
import Seat from "./seat"
import { IsVenueContext, VenueContext } from "./app"

interface RowProps {
  rowNumber: number
}

const Row = ({
  rowNumber,
}: RowProps): React.ReactElement => {
  const context = React.useContext<IsVenueContext>(VenueContext)

  const initialState = () => {
    return Array.from(Array(context.state.seatsPerRow).keys()).map(
      (r: number): string => "unsold"
    )
  }

  const seatItems = Array.from(Array(context.state.seatsPerRow).keys()).map(
    (i: number): React.ReactElement => {
      return (
        <Seat
          key={`seat-${i}`}
          seatNumber={i}
          rowNumber={rowNumber}
        />
      )
    }
  )

  return (
    <tr key={`seat-row-${rowNumber}`} className="h-20">
      {seatItems}
    </tr>
  )
}

export default Row
