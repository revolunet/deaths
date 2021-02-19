import useSWR from "swr"

const getData = (deaths) => {
  const { labels: deathsLabels, data: deathsData } = deaths
  console.log("getData", deathsLabels, deathsData)
  const data = deathsData.reduce((data, year) => data.concat(year), [])
  const labels = data.map(
    (value, i) => `${deathsLabels[i % 12]} ${2000 + Math.floor(i / 12)}`
  )

  return { labels, data }
}

const useOverview = () => {
  const { data, mutate } = useSWR("overview", null, {
    revalidateOnFocus: false,
    initialData: { labels: [], data: [] },
  })

  const setData = (deaths) => {
    // const { data: deathsData, labels: deathsLabels } = deaths
    // const data = deathsData.reduce((data, year) => data.concat(year), [])
    // const labels = data.map(
    //   (value, i) => `${deathsLabels[i % 12]} ${2000 + Math.floor(i / 12)}`
    // )

    mutate(getData(deaths), false)
  }

  return [data, setData] as const
}

export default useOverview
