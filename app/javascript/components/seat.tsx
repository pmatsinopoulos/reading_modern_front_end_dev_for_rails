import * as React from "react"

interface SeatProps {
  seatNumber: number
  initialState: string
}

const Seat = ({ seatNumber, initialState }: SeatProps): React.ReactElement => {
  const [state, setState] = React.useState(initialState)

  const changeState = (): void => {
    if (state === "held") {
      setState("unsold")
    } else {
      setState("held")
    }
  }

  const stateDisplayClass = (): string => {
    if (state === "held") {
      return "bg-screen-500 held"
    } else {
      return "bg-white hover:bg-blue-300 unsold"
    }
  }

  const cssClass = "p-4 m-2 border-black border-4 text-lg"

  return (
    <td>
      <span
        className={`${cssClass} ${stateDisplayClass()}`}
        onClick={changeState}>
        {seatNumber + 1}
      </span>
    </td>
  )
}

export default Seat
