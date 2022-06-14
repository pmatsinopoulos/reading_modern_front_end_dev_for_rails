import * as React from "react"
import styled from "styled-components"
import { seatChange, useAppDispatch, useAppSelector } from "../contexts/venue_context"
import { TicketData, TicketStatus } from "../contexts/venue_types"

interface SeatProps {
  rowNumber: number
  seatNumber: number
}

const Seat = ({
  rowNumber,
  seatNumber,
}: SeatProps): React.ReactElement => {
  const { 
    myTickets, 
    otherTickets,
    seatsPerRow,
    ticketsToBuyCount,
  } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  const seatMatch = (ticketList: TicketData[], exact = false): boolean => {
    for (const heldTicket of ticketList) {
      const rowMatch = heldTicket.row === rowNumber
      const seatDiff = heldTicket.number - seatNumber
      const diff = exact ? 1 : ticketsToBuyCount
      const seatMatch = seatDiff >= 0 && seatDiff < diff
      if (rowMatch && seatMatch) {
        return true
      }
    }
    return false
  }

  const currentStatus = (): TicketStatus => {
    if (seatMatch(otherTickets, true)) {
      return "purchased"
    }
    if (seatMatch(myTickets, true)) {
      return "held"
    }
    if (seatMatch(otherTickets) ||
        seatMatch(myTickets) ||
        seatNumber + ticketsToBuyCount - 1 > seatsPerRow) {
      return "invalid"
    }
    return "unsold"
  }

  const onSeatChange = (): void => {
    const status: TicketStatus = currentStatus()
    if (status === "invalid" || status === "purchased") {
      return
    }
    dispatch(seatChange(status, rowNumber, seatNumber))
  }

  return (
    <td>
      <ButtonSquare status={currentStatus()} onClick={onSeatChange}>
        {seatNumber + 1}
      </ButtonSquare>
    </td>
  )
}

const cssClass = "p-4 m-2 border-black border-4 text-lg"

export default Seat

// Styling

const stateColor = (state: TicketStatus): string => {
  if (state === "unsold") {
    return "white"
  }
  if (state === "held") {
    return "green"
  }
  if (state === "purchased") {
    return "red"
  }
  return "yellow"
}

interface SquareProps {
  status: TicketStatus
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
