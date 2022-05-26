import * as React from "react"
import Row from "./row"

interface VenueProps {
  rows: number
  seatsPerRow: number
}

const Venue = (props: VenueProps): React.ReactElement => {
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

  return <table className="table" cellPadding={20}>{rows}</table>
}

export default Venue
