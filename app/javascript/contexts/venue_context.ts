import { ThunkAction } from "redux-thunk"
import { createConsumer, Subscription } from "@rails/actioncable"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { TicketData, TicketStatus, VenueState, VenueAction } from "./venue_types"

let subscription: Subscription

const initSubscription = (): void => {
  if (subscription === undefined) {
    subscription = createConsumer().subscriptions.create(
      {
        channel: "ConcertChannel",
        concertId: venueStore.getState().concertId,
      },
      {
        received(tickets) {
          venueStore.dispatch({ type: "setTickets", tickets })
        }
      }
    )
  }
}

type VenueThunk = ThunkAction<void, VenueState, void, VenueAction>

const fetchData = (): VenueThunk => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `/tickets.json?concert_id=${getState().concertId}`
    )
    const tickets = await response.json()
    dispatch({ type: "setTickets", tickets })
  }
}

const initialState = {
  concertId: 1,
  myTickets: [],
  otherTickets: [],
  rowCount: 1,
  seatsPerRow: 1,
  ticketsToBuyCount: 1,
}

const venueReducer = (state: VenueState = initialState, action: VenueAction): VenueState => {
  switch (action.type) {
    case "clearHolds": {
      return { ...state, myTickets: [] }
    }
    case "holdTicket": {
      const newTickets = Array.from(
        Array(state.ticketsToBuyCount).keys()
      ).map((index): TicketData => {
        return {
          id: 0,
          row: action.rowNumber,
          number: action.seatNumber + index,
          status: TicketStatus.Held,
        }
      })
      return {
        ...state,
        myTickets: [...state.myTickets, ...newTickets],
      }
    }
    case "initFromProps": {
      return {
        ...state,
        concertId: action.props.concertId,
        rowCount: action.props.rows,
        seatsPerRow: action.props.seatsPerRow,
      }
    }
    case "setTickets":
      return {
        ...state,
        otherTickets: action.tickets.filter((ticket) => ticket.status === TicketStatus.Purchased),
        myTickets: action.tickets.filter((ticket) => ticket.status === TicketStatus.Held),
      }
    case "setTicketsToBuy":
      return { ...state, ticketsToBuyCount: action.amount }
    case "unholdTicket": {
      const newTickets = state.myTickets.filter((ticket) => {
        const rowMatch = ticket.row == action.rowNumber
        const seatDiff = ticket.number - action.seatNumber
        const seatMatch =
          seatDiff >= 0 && seatDiff < state.ticketsToBuyCount
        return !(rowMatch && seatMatch)
      })
      return { ...state, myTickets: newTickets }
    }
    default:
      return state
  }
}

const venueStore = configureStore({ reducer: venueReducer })
type RootState = ReturnType<typeof venueStore.getState>
type AppDispatch = typeof venueStore.dispatch

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const seatChange = (
  status: TicketStatus,
  rowNumber: number,
  seatNumber: number,
): VenueThunk => {
  return async (dispatch, getState) => {
    const actionType = status === TicketStatus.Unsold ? "holdTicket" : "unholdTicket"
    await subscription.perform("added_to_cart", {
      concertId: getState().concertId,
      row: rowNumber,
      seatNumber: seatNumber,
      status: actionType === "holdTicket" ? "held" : "unsold",
      ticketsToBuyCount: getState().ticketsToBuyCount,
    })
    dispatch({ type: actionType, seatNumber, rowNumber })
  }
}

const clearCart = (): VenueThunk => {
  return async (dispatch, getState) => {
    await subscription.perform("remove_from_cart", {
      concertId: getState().concertId,
      tickets: getState().myTickets,
    })
    dispatch({ type: "clearHolds" })
  }
}

export {
  clearCart, 
  fetchData,
  initialState,
  initSubscription,
  seatChange,
  useAppDispatch,
  useAppSelector,
  venueReducer,
  venueStore, 
}
