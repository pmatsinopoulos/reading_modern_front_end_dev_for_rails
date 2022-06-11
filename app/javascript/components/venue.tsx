import * as React from "react"
import SelectTicketsToBuy from "./selectTicketsToBuy"
import VenueBody from "./venueBody"
import Subtotal from "./subtotal"

const Venue = (): React.ReactElement => {
  return (
    <>
      <Subtotal />
      <SelectTicketsToBuy />
      <VenueBody />
    </>
  )
}

export default Venue
