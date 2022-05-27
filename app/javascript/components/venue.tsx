import * as React from "react"
import Row from "./row"
import SelectTicketsToBuy from "./selectTicketsToBuy"
import VenueBody from "./venueBody"

interface VenueProps {
  rows: number
  seatsPerRow: number
}

interface VenueInitialState {
  numberOfTickets: number
}

const Venue = ({ rows, seatsPerRow }: VenueProps): React.ReactElement => {
  const [state, setState] = React.useState(Venue.initialState)

  return (
    <>
      <SelectTicketsToBuy
        seatsPerRow={seatsPerRow}
        setState={setState}
        state={state}
      />
      <VenueBody
        numberOfTickets={state.numberOfTickets}
        rows={rows}
        seatsPerRow={seatsPerRow}
      />
    </>
  )
}

Venue.initialState = {
  numberOfTickets: 1,
}

export default Venue
export { VenueInitialState }
