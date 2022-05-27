import * as React from "react"
import Row from "./row"
import SelectTicketsToBuy from "./selectTicketsToBuy"

interface VenueProps {
  rows: number
  seatsPerRow: number
}

interface VenueInitialState {
  numberOfTickets: number
}

const Venue = ({ rows, seatsPerRow }: VenueProps): React.ReactElement => {
  const [state, setState] = React.useState(Venue.initialState)

  const rowComponents = Array.from(Array(rows).keys()).map(
    (row: number): React.ReactElement => {
      return (
        <Row
          key={`venue-row-${row}`}
          rowNumber={row}
          seatsPerRow={seatsPerRow}
        />
      )
    }
  )

  return (
    <>
      <SelectTicketsToBuy seatsPerRow={seatsPerRow} setState={setState} state={state} />
      <table className="table" cellPadding={20}>
        {rowComponents}
      </table>
    </>
  )
}

Venue.initialState = {
  numberOfTickets: 2,
}

export default Venue
export { VenueInitialState }
