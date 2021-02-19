import useSWR from "swr"

const useDeaths = () => {
  const { data, mutate } = useSWR("deaths", null, {
    revalidateOnFocus: false,
    initialData: { labels: [], data: [] },
  })

  const setData = (data) => {
    mutate(data, false)
  }

  return [data, setData] as const
}

export default useDeaths
