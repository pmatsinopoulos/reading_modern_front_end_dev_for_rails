import * as React from "react"
import { useAppSelector } from "../contexts/venue_context"
import Seat from "./seat"

interface RowProps {
  rowNumber: number
}

const Row = ({
  rowNumber,
}: RowProps): React.ReactElement => {
  const seatsPerRow = useAppSelector((state) => state.seatsPerRow)

  const initialState = () => {
    return Array.from(Array(seatsPerRow).keys()).map(
      (r: number): string => "unsold"
    )
  }

  const seatItems = Array.from(Array(seatsPerRow).keys()).map(
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
