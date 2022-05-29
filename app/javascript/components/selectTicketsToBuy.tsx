import * as React from "react"
import styled from "styled-components"
import { VenueInitialState } from "./venue"

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
        value={optionValue + 1}>
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
      <Header>How many tickets would you like?</Header>
      <span className="select">
        <select onChange={numberOfTicketsChanged} value={state.numberOfTickets}>{options}</select>
      </span>
    </div>
  )
}

export default SelectTicketsToBuy

const Header = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 15px;
  color: red;
`
