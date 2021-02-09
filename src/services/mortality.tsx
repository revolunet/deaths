import useSWR from "swr"
import Population from "@/data/population.json"

const getRatio = (data: {}[], year: string) =>
  (
    (data.reduce((count, month) => count + (month[year] || 0), 0) * 100) /
    Population[year]
  ).toFixed(3)

const getCount = (data: {}[], year: string) =>
  data.reduce((count, month) => count + (month[year] || 0), 0)

const getData = (deaths: {}[]) =>
  Object.keys(deaths[0]).reduce(
    (years, key) => (
      key !== "month" &&
        years.push({
          count: getCount(deaths, key),
          ratio: getRatio(deaths, key),
          year: key,
        }),
      years
    ),
    []
  )

const useMortality = () => {
  const { data, mutate } = useSWR("mortality", null, {
    initialData: [],
    revalidateOnFocus: false,
  })

  const setMortality = (ageGroupsData: [][]) => {
    const data = ageGroupsData.map((deaths) => getData(deaths))
    mutate(data)
  }

  return [data, setMortality] as const
}

export default useMortality
