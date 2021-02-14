import useSWR from "swr"
import { deaths } from "@/data/deaths.json"

const { global } = deaths

const initialData = {
  ...global.reduce((data, item, i) => ({ ...data, [2000 + i]: false }), {}),
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
