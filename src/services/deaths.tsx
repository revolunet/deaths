import useSWR from "swr"
import { deaths } from "@/data/deaths.json"

type Filters = {
  ageGroup?: [number, number]
  gender?: string
}

const sumYears = (years) =>
  years.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])

const sumAgeGroups = (ageGroups, start, end) =>
  ageGroups
    .slice(start, end)
    .reduce(
      (data, group, i) =>
        group.map((year, i) => sumYears([data[i] ?? [], year])),
      []
    )

const getData = ({ gender = null, ageGroup = null } = {}) => {
  console.log("getData", gender, ageGroup)
  const data =
    gender && ageGroup
      ? sumAgeGroups(
          deaths[gender].ageGroups,
          ageGroup[0] / 10,
          ageGroup[1] / 10
        )
      : gender
      ? deaths[gender].global
      : ageGroup
      ? sumAgeGroups(deaths.ageGroups, ageGroup[0] / 10, ageGroup[1] / 10)
      : deaths.global

  return { labels: deaths.labels, data }
}

const initialData = getData()

const useDeaths = () => {
  console.log("useDeaths")
  const { data, mutate } = useSWR("deaths", null, {
    initialData,
    revalidateOnFocus: false,
  })

  const applyFilters = (filters: Filters) => {
    const data = getData(filters)
    return mutate(data)
  }

  return [data, applyFilters] as const
}

export default useDeaths
