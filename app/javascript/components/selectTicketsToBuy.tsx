import * as React from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../contexts/venue_context"

const SelectTicketsToBuy = (): React.ReactElement => {
  const {
    seatsPerRow,
    ticketsToBuyCount
  } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

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
    dispatch({
      type: "setTicketsToBuy",
      amount: parseInt(target.value, 10),
    })
  }

  return (
    <div>
      <Header>How many tickets would you like?</Header>
      <span className="select">
        <select onChange={numberOfTicketsChanged} value={ticketsToBuyCount}>{options}</select>
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
