import * as React from "react"
import styled from "styled-components"
import { IsVenueContext, VenueContext } from "./app"

const SelectTicketsToBuy = (): React.ReactElement => {
  const context = React.useContext<IsVenueContext>(VenueContext)

  const options = Array.from(Array(context.state.seatsPerRow).keys()).map(
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
    context.dispatch({
      type: "setTicketsToBuy",
      amount: parseInt(target.value, 10),
    })
  }

  return (
    <div>
      <Header>How many tickets would you like?</Header>
      <span className="select">
        <select onChange={numberOfTicketsChanged} value={context.state.seatsPerRow}>{options}</select>
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
