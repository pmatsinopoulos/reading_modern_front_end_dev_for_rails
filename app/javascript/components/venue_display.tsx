import * as React from "react"
import { createRoot } from "react-dom/client"
import App from "./app"

document.addEventListener("turbo:load", () => {
  const container = document.getElementById("react-element")
  if (container) {
    const root = createRoot(container)
    const concertId: number = parseInt(container.dataset.concertId || "0", 10)
    const rows: number = parseInt(container.dataset.rows || "0", 10)
    const seatsPerRow: number = parseInt(container.dataset.seatsPerRow || "0", 10)
    root.render(<App concertId={concertId} rows={rows} seatsPerRow={seatsPerRow} />)
  }
})
