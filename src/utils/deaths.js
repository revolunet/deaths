import Months from "@data/months"
import population from "@data/population"
import { global as deaths } from "@data/deaths"

export const AgeGroups = [
  "fifteen",
  "thirty",
  "fortyfive",
  "sixty",
  "seventyfive",
  "ninety",
  "ninetyplus",
]

export const getTotal = (year) =>
  deaths.reduce((count, month) => count + (month[year] || 0), 0)

export const defaultYears = Object.keys(deaths[0]).reduce(
  (years, year) => (year !== "month" && (years[year] = year > 2016), years),
  {}
)

export const getLinearDeaths = (data) =>
  data
    .reduce(
      (result, death) =>
        result.concat(
          Object.keys(death).reduce(
            (months, key) => (
              key !== "month" &&
                months.push({
                  year: key,
                  value: death[key],
                  month: death.month,
                  label: `${death.month} ${key}`,
                  date: new Date(
                    key,
                    Months.indexOf(death.month),
                    15
                  ).getTime(),
                }),
              months
            ),
            []
          )
        ),
      []
    )
    .sort((a, b) => a.date - b.date)

export const getRatio = (data, year) =>
  (
    (data.reduce((count, month) => count + (month[year] || 0), 0) * 100) /
    population[year]
  ).toFixed(3)

export const getCount = (data, year) =>
  data.reduce((count, month) => count + (month[year] || 0), 0)

export const getRatioDeaths = (data) =>
  Object.keys(data[0]).reduce(
    (years, key) => (
      key !== "month" &&
        years.push({
          count: getCount(data, key),
          ratio: getRatio(data, key),
          year: key,
        }),
      years
    ),
    []
  )
