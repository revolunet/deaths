import useSWR from "swr"
import useDeaths from "@/services/deaths"
import useOverview from "@/services/overview"
import useMortality from "@/services/mortality"

const initialData: Filters = {
  ageGroup: [0, 110],
  gender: null,
}

const useFilters = () => {
  const [, applyDeathsFilters] = useDeaths()
  const [, setOverview] = useOverview()
  const [, applyMortalityFilters] = useMortality()

  const { data: filters, mutate } = useSWR("filters", null, {
    initialData,
  })

  const setFilters = (filters: Filters) => {
    mutate(filters)
    const deaths = applyDeathsFilters(filters)
    setOverview(deaths)
    applyMortalityFilters(filters)
  }

  return [filters, setFilters] as const
}

export default useFilters
