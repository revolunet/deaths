import useSWR from "swr"
import Mortality from "@/data/mortality.json"
import Population from "@/data/population.json"

const sumYears = (years: number[][]) =>
  years.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])

const getData = ({ ageGroup, gender }: Filters) => {
  const data = (gender
    ? Mortality[gender].ageGroups
    : Mortality.ageGroups
  ).slice(ageGroup[0] / 10, ageGroup[1] / 10)
  return {
    data,
    ratio: sumYears(data).map(
      (count, i) => (count * 100) / Population[2000 + i]
    ),
    labels: Mortality.ageGroups[0].map((group, i) => 2000 + i),
  }
}

const initialData = getData({ gender: null, ageGroup: [0, 110] })

const useMortality = () => {
  const { data, mutate } = useSWR("mortality", null, {
    initialData,
    revalidateOnFocus: false,
  })

  const applyFilters = (filters: Filters) => {
    mutate(getData(filters))
  }

  return [data, applyFilters] as const
}

export default useMortality
