import * as React from "react"
import Row from "./row"
import { IsVenueContext, VenueContext } from "./app"

const VenueBody = (): React.ReactElement => {
  const context = React.useContext<IsVenueContext>(VenueContext)

  const rowComponents = Array.from(Array(context.state.rowCount).keys()).map(
    (row: number): React.ReactElement => {
      return (
        <Row
          key={`venue-row-${row}`}
          rowNumber={row}
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
