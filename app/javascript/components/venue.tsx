import * as React from "react"
import { createConsumer, Subscription } from "@rails/actioncable"
import SelectTicketsToBuy from "./selectTicketsToBuy"
import VenueBody from "./venueBody"

interface VenueProps {
  concertId: number
  rows: number
  seatsPerRow: number
}

export interface TicketData {
  id: number
  row: number
  number: number
  status: string
}
export type RowData = TicketData[]
export type VenueData = RowData[]

let subscription: Subscription

const Venue = ({ concertId, rows, seatsPerRow }: VenueProps): React.ReactElement => {
  const [ticketsToBuyCount, setTicketsToBuyCount] = React.useState(1)
  const [venueData, setVenueData] = React.useState<VenueData>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/tickets.json?concert_id=${concertId}`)
      const json = await response.json()
      setVenueData(json)
    }

    fetchData()
  }, [])

  if (subscription === undefined) {
    subscription = createConsumer().subscriptions.create(
      { channel: "ConcertChannel", concertId: concertId },
      {
        connected() {
          console.debug(`Venue, Subscription for concert with id ${concertId} done`)
        },
        received(data) {
          setVenueData(data)
        },
      }
    )
  }

  return (
    <>
      <SelectTicketsToBuy
        seatsPerRow={seatsPerRow}
        setTicketsToBuyCount={setTicketsToBuyCount}
        ticketsToBuyCount={ticketsToBuyCount}
      />
      <VenueBody
        concertId={concertId}
        numberOfTickets={ticketsToBuyCount}
        rows={rows}
        seatsPerRow={seatsPerRow}
        subscription={subscription}
        venueData={venueData}
      />
    </>
  )
}

export default Venue
