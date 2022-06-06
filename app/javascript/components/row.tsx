import * as React from "react"
import Seat from "./seat"
import { RowData } from "./venue"
import { TicketData } from "./venue"
import { Subscription } from "@rails/actioncable"

interface RowProps {
  concertId: number
  numberOfTickets: number
  rowData: RowData
  rowNumber: number
  seatsPerRow: number
  subscription: Subscription
}

const Row = ({
  concertId,
  numberOfTickets,
  rowData,
  rowNumber,
  seatsPerRow,
  subscription,
}: RowProps): React.ReactElement => {
  const initialState = () => {
    return Array.from(Array(seatsPerRow).keys()).map(
      (r: number): string => "unsold"
    )
  }
  const [seatStatuses, setSeatStatuses] = React.useState(initialState())

  React.useEffect(() => {
    console.debug("rowData", rowData)
    if (rowData) {
      console.debug("calling setSeatStatuses")
      setSeatStatuses(
        rowData.map((seatStatus: TicketData) => seatStatus.status)
      )
    }
  }, [rowData])

  const isSeatValid = (seatNumber: number): boolean => {
    if (seatNumber + numberOfTickets > seatsPerRow) {
      return false
    }
    for (let i = 1; i < numberOfTickets; i++) {
      if (seatStatuses[seatNumber + i] === "held") {
        return false
      }
    }
    return true
  }

  const seatStatus = (seatNumber: number): string => {
    if (seatStatuses[seatNumber] === "held") {
      return "held"
    }
    if (seatStatuses[seatNumber] === "purchased") {
      return "purchased"
    }
    return isSeatValid(seatNumber) ? "unsold" : "invalid"
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

  const updateSeatStatus = (seatNumber: number): string[] => {
    return seatStatuses.map((status: string, index: number) => {
      if (index >= seatNumber && index < seatNumber + numberOfTickets) {
        return newStatus(seatStatuses[seatNumber])
      } else {
        return status
      }
    })
  }
  const seatClicked = (seatNumber: number): void => {
    const validStatus = seatStatus(seatNumber)
    if (validStatus === "invalid" || validStatus === "purchased") {
      return
    }
    const newSeatStatuses = updateSeatStatus(seatNumber)
    setSeatStatuses(newSeatStatuses)

    subscription.perform("added_to_cart", {
      concertId: concertId,
      row: rowNumber + 1,
      seatNumber: seatNumber + 1,
      status: newSeatStatuses[seatNumber],
      ticketsToBuyCount: numberOfTickets
    })
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
