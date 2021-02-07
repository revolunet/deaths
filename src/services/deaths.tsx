import useSWR from "swr"

const useDeaths = () => {
  const { data, mutate } = useSWR("deaths", null, {
    initialData: [],
    revalidateOnFocus: false,
  })

  return [data, mutate] as const
}

export default useDeaths
