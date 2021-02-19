import useSWR from "swr"

const useLocations = () => {
  const { data, mutate } = useSWR("locations", null, {
    initialData: [],
    revalidateOnFocus: false,
  })

  const setData = (data) => {
    mutate(data, false)
  }

  return [data, setData] as const
}

export default useLocations
