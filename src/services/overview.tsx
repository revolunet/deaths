import useSWR from "swr"

const initialData = { labels: [], data: [] }

const useOverview = () => {
  const { data, mutate } = useSWR("overview", null, {
    initialData,
    revalidateOnFocus: false,
  })

  const setData = ({
    labels: deathsLabels,
    data: deathsData,
  }: {
    labels: string[]
    data: number[][]
  }) => {
    const data = deathsData.reduce((data, year) => data.concat(year), [])
    const labels = data.map(
      (value, i) => `${deathsLabels[i % 12]} ${2000 + Math.floor(i / 12)}`
    )

    mutate({ labels, data })
  }

  return [data, setData] as const
}

export default useOverview
