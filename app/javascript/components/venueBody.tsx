import * as React from "react"
import Row from "./row"
import { VenueData } from "./venue"
import { Subscription } from "@rails/actioncable"

interface VenueBodyProps {
  concertId: number
  numberOfTickets: number
  rows: number
  seatsPerRow: number
  subscription: Subscription
  venueData: VenueData
}

const VenueBody = ({
  concertId,
  numberOfTickets,
  rows,
  seatsPerRow,
  subscription,
  venueData,
}: VenueBodyProps): React.ReactElement => {
  const rowComponents = Array.from(Array(rows).keys()).map(
    (row: number): React.ReactElement => {
      return (
        <Row
          concertId={concertId}
          key={`venue-row-${row}`}
          rowData={venueData[row]}
          rowNumber={row}
          seatsPerRow={seatsPerRow}
          subscription={subscription}
          numberOfTickets={numberOfTickets}
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
