import * as React from "react"
import Seat from "./seat"
import { RowData } from "./venue"
import { TicketData } from "./venue"

interface RowProps {
  concertId: number
  numberOfTickets: number
  rowData: RowData
  rowNumber: number
  seatsPerRow: number
}

const Row = ({
  concertId,
  numberOfTickets,
  rowData,
  rowNumber,
  seatsPerRow,
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

  const csrfToken = (): string => {
    return document.querySelector("[name='csrf-token']")?.getAttribute("content")
  }

  const seatClicked = (seatNumber: number): void => {
    const validStatus = seatStatus(seatNumber)
    if (validStatus === "invalid" || validStatus === "purchased") {
      return
    }
    const newSeatStatuses = updateSeatStatus(seatNumber)
    setSeatStatuses(newSeatStatuses)

    fetch(`/shopping_carts`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        concertId,
        row: rowNumber + 1,
        seatNumber: seatNumber + 1,
        status: newSeatStatuses[seatNumber],
        ticketsToBuyCount: numberOfTickets,
      }),
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
