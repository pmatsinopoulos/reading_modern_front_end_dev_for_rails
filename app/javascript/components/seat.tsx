import * as React from "react"
import styled from "styled-components"

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

  return (
    <td>
      <ButtonSquare status={status} onClick={onSeatClicked}>
        {seatNumber + 1}
      </ButtonSquare>
    </td>
  )
}

const cssClass = "p-4 m-2 border-black border-4 text-lg"

export default Seat

// Styling

const stateColor = (state: string): string => {
  if (state === "unsold") {
    return "white"
  }
  if (state === "held") {
    return "green"
  }
  return "red"
}

interface SquareProps {
  status: string
  className?: string
}

const ButtonSquare = styled.span.attrs({
  className: cssClass,
})<SquareProps>`
  background-color: ${({ status }) => stateColor(status)};
  transition: all 1s ease-in-out;
  &:hover {
    background-color: ${({ status }) => status === "unsold" ? "lightblue" : stateColor(status)};
  }
`
