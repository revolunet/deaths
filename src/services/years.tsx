import useSWR from "swr"
import deaths from "@/data/deaths.json"

const { global } = deaths

const initialData = Object.keys(global[0]).reduce(
  (years, year) => (year !== "month" && (years[year] = +year > 2016), years),
  {}
)

const useYears = () => {
  const { data: years, mutate: setYears } = useSWR("years", null, {
    initialData,
  })

  return [years, setYears] as const
}

export default useYears
