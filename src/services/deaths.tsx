import useSWR from "swr"
import { deaths } from "@/data/deaths.json"

const sumYears = (years: number[][]) =>
  years.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])

const sumAgeGroups = (ageGroups: number[][][], start: number, end: number) =>
  ageGroups
    .slice(start, end)
    .reduce(
      (data, group, i) =>
        group.map((year, i) => sumYears([data[i] ?? [], year])),
      []
    )

const getData = ({
  gender,
  ageGroup,
}: Filters): { labels: string[]; data: number[][] } => {
  const data =
    gender && ageGroup
      ? sumAgeGroups(
          deaths[gender].ageGroups,
          ageGroup[0] / 10,
          ageGroup[1] / 10
        )
      : gender
      ? deaths[gender].global
      : sumAgeGroups(deaths.ageGroups, ageGroup[0] / 10, ageGroup[1] / 10)

  return { labels: deaths.labels, data }
}

const initialData = getData({ gender: null, ageGroup: [0, 110] })

const useDeaths = () => {
  const { data, mutate } = useSWR("deaths", null, {
    initialData,
    revalidateOnFocus: false,
  })

  const applyFilters = (filters: Filters) => {
    const data = getData(filters)
    mutate(data)
    return data
  }

  return [data, applyFilters] as const
}

export default useDeaths
