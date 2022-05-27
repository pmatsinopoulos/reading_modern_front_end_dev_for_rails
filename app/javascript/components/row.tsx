import * as React from "react"
import Seat from "./seat"

interface RowProps {
  numberOfTickets: number
  rowNumber: number
  seatsPerRow: number
}

const Row = ({
  numberOfTickets,
  rowNumber,
  seatsPerRow,
}: RowProps): React.ReactElement => {
  const initialState = () => {
    return Array.from(Array(seatsPerRow).keys()).map(
      (r: number): string => "unsold"
    )
  }
  const [state, setState] = React.useState(initialState())

  const isSeatValid = (seatNumber: number): boolean => {
    if (seatNumber + numberOfTickets > seatsPerRow) {
      return false
    }
    for (let i = 1; i < numberOfTickets; i++) {
      if (state[seatNumber + i] === "held") {
        return false
      }
    }
    return true
  }

  const seatStatus = (seatNumber: number): string => {
    if (state[seatNumber] === "held") {
      return "held"
    } else {
      return isSeatValid(seatNumber) ? "unsold" : "invalid"
    }
  }

  const newStatus = (oldStatus: string): string => {
    if (oldStatus === "unsold") {
      return "held"
    }
    if (oldStatus === "held") {
      return "unsold"
    }
    if (oldStatus === "invalid") {
      return "invalid"
    }
  }

  const seatClicked = (seatNumber: number): void => {
    if (seatStatus(seatNumber) === "invalid") {
      return
    }

    setState(
      state.map((seat, index) => {
        if (index >= seatNumber && index < seatNumber + numberOfTickets) {
          return newStatus(state[seatNumber])
        } else {
          return seat
        }
      })
    )
  }

  const seatItems = Array.from(Array(seatsPerRow).keys()).map(
    (i: number): React.ReactElement => {
      return (
        <Seat
          key={`seat-${i}`}
          status={seatStatus(i)}
          seatNumber={i}
          seatClicked={seatClicked}
        />
      )
    }
  )

  return (
    <tr key={`seat-row-${rowNumber}`} className="h-20">
      {seatItems}
    </tr>
  )
}

export default Row
