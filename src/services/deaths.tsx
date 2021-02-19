import useSWR from "swr"

const useDeaths = () => {
  const { data, mutate } = useSWR("deaths", null, {
    revalidateOnFocus: false,
    initialData: { labels: [], data: [] },
  })
  console.log("useDeaths", data)

  const setData = (data) => {
    mutate(data, false)
  }

  return [data, setData] as const
}

export default useDeaths

// import useSWR from "swr"
// import { sumYears } from "@/utils/index"
// import useFilters from "@/services/filters"

// const fetcher = (url: string, filters: string) =>
//   // fetch(url).then(async (res) => res.json())
//   fetch(url).then(async (res) => {
//     const f = JSON.parse(filters)
//     const deaths = await res.json()
//     console.log("FETCHED", deaths)

//     const data = getData(deaths, f)
//     return {
//       labels: deaths.labels,
//       data: getData(deaths, f),
//       filters,
//     }
//   })

// const sumAgeGroups = (ageGroups: number[][][], start: number, end: number) =>
//   ageGroups
//     ?.slice(start, end)
//     .reduce(
//       (data, group, i) =>
//         group.map((year, i) => sumYears([data[i] ?? [], year])),
//       []
//     )

// const getData = (deaths, filters): number[][] => {
//   // if (!deaths) return []
//   // const { filters, data } = deaths
//   const { gender, ageGroup } = filters
//   return gender && ageGroup
//     ? sumAgeGroups(deaths[gender].ageGroups, ageGroup[0] / 10, ageGroup[1] / 10)
//     : gender
//     ? deaths[gender].global
//     : sumAgeGroups(deaths.ageGroups, ageGroup[0] / 10, ageGroup[1] / 10)
// }

// const useDeaths = () => {
//   const [filters] = useFilters()
//   console.log("FILTERS", filters)

//   const { data } = useSWR(
//     ["/data/deaths.json", JSON.stringify(filters)],
//     fetcher,
//     {
//       revalidateOnFocus: false,
//     }
//   )

//   // const applyFilters = (filters: Filters) =>
//   //   deaths && mutate({ ...deaths, filters }, false)
//   console.log("DEATHS", data)
//   return [
//     data,
//     // {
//     //   labels: deaths?.labels,
//     //   data: getData(deaths, filters),
//     //   filters,
//     // },
//     // deaths && { labels: deaths?.data?.labels, data: getData(deaths) },
//     // applyFilters,
//   ] as const
// }

// export default useDeaths

// import useSWR from "swr"
// import { sumYears } from "@/utils/index"
// import useFilters from "@/services/filters"

// const fetcher = (url: string) =>
//   fetch(url).then(async (res) => ({
//     data: await res.json(),
//     filters: { gender: null, ageGroup: [0, 110] } as Filters,
//   }))

// const sumAgeGroups = (ageGroups: number[][][], start: number, end: number) =>
//   ageGroups
//     ?.slice(start, end)
//     .reduce(
//       (data, group, i) =>
//         group.map((year, i) => sumYears([data[i] ?? [], year])),
//       []
//     )

// const getData = (deaths): number[][] => {
//   if (!deaths) return []
//   const { filters, data } = deaths
//   const { gender, ageGroup } = filters
//   return gender && ageGroup
//     ? sumAgeGroups(data[gender].ageGroups, ageGroup[0] / 10, ageGroup[1] / 10)
//     : gender
//     ? data[gender].global
//     : sumAgeGroups(data?.ageGroups, ageGroup[0] / 10, ageGroup[1] / 10)
// }

// const useDeaths = () => {
//   const { data: deaths, mutate } = useSWR("/data/deaths.json", fetcher, {
//     revalidateOnFocus: false,
//   })

//   const applyFilters = (filters: Filters) => {
//     deaths && mutate({ ...deaths, filters }, false)
//     return deaths && { labels: deaths?.data?.labels, data: getData(deaths) }
//   }

//   return [
//     deaths && { labels: deaths?.data?.labels, data: getData(deaths) },
//     applyFilters,
//   ] as const
// }

// export default useDeaths
