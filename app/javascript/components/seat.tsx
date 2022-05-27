import * as React from "react"

interface SeatProps {
  seatClicked: (seatNumber: number) => void
  seatNumber: number
  status: string
}

const Seat = ({
  seatClicked,
  seatNumber,
  status,
}: SeatProps): React.ReactElement => {
  const onSeatClicked = (): void => {
    seatClicked(seatNumber)
  }

  const stateDisplayClass = (): string => {
    if (status === "held") {
      return "bg-screen-500 held"
    } else if (status === "invalid") {
      return "bg-red-300 invalid"
    } else {
      return "bg-white hover:bg-blue-300 unsold"
    }
  }

  const cssClass = "p-4 m-2 border-black border-4 text-lg"

  return (
    <td>
      <span
        className={`${cssClass} ${stateDisplayClass()}`}
        onClick={onSeatClicked}>
        {seatNumber + 1}
      </span>
    </td>
  )
}

export default Seat
