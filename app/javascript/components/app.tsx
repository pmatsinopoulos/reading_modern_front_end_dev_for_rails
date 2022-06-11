import * as React from "react"
import { Provider } from "react-redux"
import Venue from "./venue"
import { fetchData, initSubscription, venueStore } from "../contexts/venue_context"

interface AppProps {
  concertId: number
  rows: number
  seatsPerRow: number
}

const App = ({
  concertId,
  rows,
  seatsPerRow,
}: AppProps): React.ReactElement => {
  venueStore.dispatch({ type: "initFromProps", props: { concertId, rows, seatsPerRow } })
  initSubscription()
  venueStore.dispatch(fetchData())

  return (
    <Provider store={venueStore}>
      <Venue />
    </Provider>
  )
}

export default App
export { AppProps }
