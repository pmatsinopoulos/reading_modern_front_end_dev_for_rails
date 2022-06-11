import * as React from "react"
import { useAppSelector } from "../contexts/venue_context"
import Row from "./row"

const VenueBody = (): React.ReactElement => {
  const {
    rowCount
  } = useAppSelector((state) => state)

  const rowComponents = Array.from(Array(rowCount).keys()).map(
    (row: number): React.ReactElement => {
      return (
        <Row
          key={`venue-row-${row}`}
          rowNumber={row}
        />
      )
    }
  )

  return (
    <table className="table" cellPadding={20}>
      <tbody>{rowComponents}</tbody>
    </table>
  )
}

export default VenueBody
