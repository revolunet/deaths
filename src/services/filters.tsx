import useSWR, { mutate } from "swr"
import deaths from "@/data/deaths.json"
import useDeaths from "@/services/deaths"
import useOverview from "@/services/overview"
import AgeGroups from "@/data/age-groups.json"
import useMortality from "@/services/mortality"

const initialData = {
  age: null,
  gender: null,
}

type Filters = {
  age: string
  gender: string
}

const getData = ({ age, gender }) =>
  gender && age
    ? deaths[gender][age]
    : gender
    ? deaths[gender]["global"]
    : age
    ? deaths[age]
    : deaths["global"]

const getAgeGroupsdData = ({ age, gender }) =>
  gender && age
    ? [deaths[gender][age]]
    : gender
    ? AgeGroups.map((group) => deaths[gender][group])
    : age
    ? [deaths[age]]
    : AgeGroups.map((group) => deaths[group])

const useFilters = () => {
  const [, setDeaths] = useDeaths()
  const [, setOverview] = useOverview()
  const [, setMortality] = useMortality()

  const { data: filters, mutate } = useSWR("filters", null, {
    initialData,
  })

  const setFilters = (filters: Filters) => {
    const data = getData(filters)
    const ageGroupsData = getAgeGroupsdData(filters)

    mutate(filters)
    setDeaths(data)
    setOverview(data)
    setMortality(ageGroupsData)
  }

  return [filters, setFilters] as const
}

export default useFilters
