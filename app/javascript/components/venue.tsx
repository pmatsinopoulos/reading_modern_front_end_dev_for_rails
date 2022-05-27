import * as React from "react"
import Row from "./row"

interface VenueProps {
  rows: number
  seatsPerRow: number
}

interface VenueInitialState {
  numberOfTickets: number
}

const Venue = (props: VenueProps): React.ReactElement => {
  const [state, setState] = React.useState(Venue.initialState)

  const rows = Array.from(Array(props.rows).keys()).map(
    (row: number): React.ReactElement => {
      return (
        <Row
          key={`venue-row-${row}`}
          rowNumber={row}
          seatsPerRow={props.seatsPerRow}
        />
      )
    }
  )

  const options = Array.from(Array(props.seatsPerRow).keys()).map(
    (optionValue: number): React.ReactElement => (
      <option key={`number-of-tickets-${optionValue}`} value={optionValue + 1} selected={state.numberOfTickets == optionValue + 1}>
        {optionValue + 1}
      </option>
    )
  )

  const numberOfTicketsChanged = (inputElement) => {
    setState({
      ...state,
      numberOfTickets: parseInt(inputElement.target.value),
    })
  }

  return (
    <>
      <div>
        <span className="header">How many tickets would you like?</span>
        <span className="select">
          <select onChange={numberOfTicketsChanged}>{options}</select>
        </span>
      </div>
      <table className="table" cellPadding={20}>
        {rows}
      </table>
    </>
  )
}

Venue.initialState = {
  numberOfTickets: 2,
}

export default Venue
