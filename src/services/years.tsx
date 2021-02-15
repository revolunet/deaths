import useSWR from "swr"
import Deaths from "@/data/deaths.json"

const { ageGroups } = Deaths

const initialData = {
  ...ageGroups[0].reduce(
    (data, item, i) => ({ ...data, [2000 + i]: false }),
    {}
  ),
  2020: true,
  2017: true,
  2003: true,
}

const useYears = () => {
  const { data: years, mutate: setYears } = useSWR("years", null, {
    initialData,
  })

  return [years, setYears] as const
}

export default useYears
