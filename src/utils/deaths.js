import deaths from "@data/deaths"

export const getTotal = (year) =>
  new Intl.NumberFormat("fr-FR").format(
    deaths.reduce((count, month) => count + (month[year] || 0), 0)
  )

export const defaultYears = Object.keys(deaths[0]).reduce(
  (years, year) => (year !== "month" && (years[year] = year > 2016), years),
  {}
)
