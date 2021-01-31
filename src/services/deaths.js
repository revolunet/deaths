import useSWR from "swr"
import deaths from "@data/deaths"

const useDeaths = () => {
  const { global } = deaths

  const { data, mutate } = useSWR("deaths", null, {
    initialData: global,
  })

  const setData = ({ age, gender }) => {
    return gender && age
      ? mutate(deaths[gender][age])
      : gender
      ? mutate(deaths[gender]["global"])
      : age
      ? mutate(deaths[age])
      : mutate(deaths["global"])
  }

  return [data, setData]
}

export default useDeaths
