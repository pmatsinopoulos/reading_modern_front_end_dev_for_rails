import { AppProps } from "../components/app"

interface TicketData {
  id: number
  number: number
  row: number
  status: string
}

interface VenueState {
  concertId: number
  myTickets: TicketData[]
  otherTickets: TicketData[]
  rowCount: number
  seatsPerRow: number
  ticketsToBuyCount: number
}

interface SetTicketToBuy {
  type: "setTicketsToBuy"
  amount: number
}

interface HoldTicket {
  type: "holdTicket"
  seatNumber: number
  rowNumber: number
}

interface UnholdTicket {
  type: "unholdTicket"
  seatNumber: number
  rowNumber: number
}

interface ClearHolds {
  type: "clearHolds"
}

interface SetTickets {
  type: "setTickets"
  tickets: TicketData[]
}

interface InitFromProps {
  type: "initFromProps"
  props: AppProps
}

type VenueAction =
  | ClearHolds
  | HoldTicket
  | InitFromProps
  | SetTicketToBuy
  | SetTickets
  | UnholdTicket

export { TicketData, VenueAction, VenueState }
