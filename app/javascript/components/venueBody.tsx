import * as React from "react"
import Row from "./row";

interface VenueBodyProps {
  numberOfTickets: number
  rows: number
  seatsPerRow: number
}

const VenueBody = ({ numberOfTickets, rows, seatsPerRow }: VenueBodyProps): React.ReactElement => {
  const rowComponents = Array.from(Array(rows).keys()).map(
    (row: number): React.ReactElement => {
      return (
        <Row
          key={`venue-row-${row}`}
          rowNumber={row}
          seatsPerRow={seatsPerRow}
          numberOfTickets={numberOfTickets}
        />
      )
    }
  )

  return (
    <table className="table" cellPadding={20}>
      {rowComponents}
    </table>
  )
}

export default VenueBody
