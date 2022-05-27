import * as React from "react"
import Venue, { VenueInitialState } from "./venue"

interface SelectTicketsToBuyProps {
  seatsPerRow: number
  setState: (VenueInitialState) => void
  state: VenueInitialState
}

const SelectTicketsToBuy = ({ seatsPerRow, setState, state }: SelectTicketsToBuyProps): React.ReactElement => {
  const options = Array.from(Array(seatsPerRow).keys()).map(
    (optionValue: number): React.ReactElement => (
      <option
        key={`number-of-tickets-${optionValue}`}
        value={optionValue + 1}
        selected={state.numberOfTickets == optionValue + 1}>
        {optionValue + 1}
      </option>
    )
  )

  const numberOfTicketsChanged = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLSelectElement
    setState({
      ...state,
      numberOfTickets: parseInt(target.value),
    })
  }

  return (
    <div>
      <span className="header">How many tickets would you like?</span>
      <span className="select">
        <select onChange={numberOfTicketsChanged}>{options}</select>
      </span>
    </div>
  )
}

export default SelectTicketsToBuy
