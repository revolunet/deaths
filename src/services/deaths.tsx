import useSWR from "swr"
import { sumYears } from "@/utils/index"

const fetcher = (url: string) =>
  fetch(url).then(async (res) => ({
    data: await res.json(),
    filters: { gender: null, ageGroup: [0, 110] } as Filters,
  }))

const sumAgeGroups = (ageGroups: number[][][], start: number, end: number) =>
  ageGroups
    ?.slice(start, end)
    .reduce(
      (data, group, i) =>
        group.map((year, i) => sumYears([data[i] ?? [], year])),
      []
    )

const getData = (deaths): number[][] => {
  const { filters, data } = deaths
  const { gender, ageGroup } = filters
  return gender && ageGroup
    ? sumAgeGroups(data[gender].ageGroups, ageGroup[0] / 10, ageGroup[1] / 10)
    : gender
    ? data[gender].global
    : sumAgeGroups(data?.ageGroups, ageGroup[0] / 10, ageGroup[1] / 10)
}

const useDeaths = () => {
  const { data, mutate } = useSWR("/data/deaths.json", fetcher, {
    revalidateOnFocus: false,
  })

  const applyFilters = (filters: Filters) =>
    data && mutate({ ...data, filters }, false)

  return [
    data ? { labels: data.data?.labels, data: getData(data) } : [],
    applyFilters,
  ] as const
}

export default useDeaths
