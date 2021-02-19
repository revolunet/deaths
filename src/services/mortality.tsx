import useSWR from "swr"

const useMortality = () => {
  const { data, mutate } = useSWR("mortality", null, {
    revalidateOnFocus: false,
    initialData: { labels: [], data: [], ratio: [] },
  })

  const setData = (data) => {
    mutate(data, false)
  }

  return [data, setData] as const
}

export default useMortality
