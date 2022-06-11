import * as React from "react"
import styled from "styled-components"
import { IsVenueContext, SubscriptionContext, VenueContext } from "./app"
import { TicketData } from "../contexts/venue_types"
import { Subscription } from "@rails/actioncable"

interface SeatProps {
  rowNumber: number
  seatNumber: number
}

const Seat = ({
  rowNumber,
  seatNumber,
}: SeatProps): React.ReactElement => {
  const context = React.useContext<IsVenueContext>(VenueContext)
  const subscription = React.useContext<Subscription>(SubscriptionContext)

  const seatMatch = (ticketList: TicketData[], exact = false): boolean => {
    for (const heldTicket of ticketList) {
      const rowMatch = heldTicket.row === rowNumber
      const seatDiff = heldTicket.number - seatNumber
      const diff = exact ? 1 : context.state.ticketsToBuyCount
      const seatMatch = seatDiff >= 0 && seatDiff < diff
      if (rowMatch && seatMatch) {
        return true
      }
    }
    return false
  }

  const currentStatus = (): string => {
    if (seatMatch(context.state.otherTickets, true)) {
      return "purchased"
    }
    if (seatMatch(context.state.myTickets, true)) {
      return "held"
    }
    if (seatMatch(context.state.otherTickets) ||
        seatMatch(context.state.myTickets) ||
        seatNumber + context.state.ticketsToBuyCount - 1 > context.state.seatsPerRow) {
      return "invalid"
    }
    return "unsold"
  }

  const onSeatChange = (): void => {
    const status = currentStatus()
    if (status === "invalid" || status === "purchased") {
      return
    }
    const actionType = status === "unsold" ? "holdTicket" : "unholdTicket"
    context.dispatch({ type: actionType, seatNumber, rowNumber })
    subscription.perform("added_to_cart", {
      concertId: context.state.concertId,
      row: rowNumber,
      seatNumber: seatNumber,
      status: actionType === "holdTicket" ? "held" : "unsold",
      ticketsToBuyCount: context.state.ticketsToBuyCount,
    })
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

const stateColor = (state: string): string => {
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
