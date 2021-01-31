import { global as deaths } from "@data/deaths"
import palette from "google-palette"

const keys = Object.keys(deaths[0])

const colors = palette("rainbow", keys.length, 0, 0.5)

export default keys.reduce(
  (res, year, i) => (year !== "month" && (res[year] = `#${colors[i]}`), res),
  {}
)
