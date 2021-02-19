import useSWR from "swr"
import { sumYears } from "@/utils/index"
import useFilters from "@/services/filters"
import useMortality from "@/services/mortality"
import Population from "@/data/population.json"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const filter = (data, { gender, ageGroup }: Filters) => {
  const d = (gender ? data[gender].ageGroups : data.ageGroups).slice(
    ageGroup[0] / 10,
    ageGroup[1] / 10
  )
  return {
    data: d,
    labels: data.ageGroups[0].map((group, i) => 2000 + i),
    ratio: sumYears(d).map((count, i) => (count * 100) / Population[2000 + i]),
  }
}

const useRawMortality = () => {
  const [filters] = useFilters()
  const [, setMortality] = useMortality()
  const { data } = useSWR("/data/mortality.json", fetcher, {
    revalidateOnFocus: false,
  })

  if (data && filters) {
    const filteredData = filter(data, filters)
    setMortality(filteredData)
  }

  return [data] as const
}

export default useRawMortality
