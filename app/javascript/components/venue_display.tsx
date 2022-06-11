import * as React from "react"
import { createRoot } from "react-dom/client"
import App from "./app"

document.addEventListener("turbo:load", () => {
  if (document.getElementById("react-element")) {
    const container = document.getElementById("react-element")
    const root = createRoot(container)
    const concertId = parseInt(container.dataset.concertId, 10)
    const rows = parseInt(container.dataset.rows, 10)
    const seatsPerRow = parseInt(container.dataset.seatsPerRow, 10)
    root.render(<App concertId={concertId} rows={rows} seatsPerRow={seatsPerRow} />)
  }
})
