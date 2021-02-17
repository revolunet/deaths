import useSWR from "swr"

const defaultYears = {
  2020: true,
  2017: true,
  2003: true,
}

const fetcher = (url: string) =>
  fetch(url).then(async (res) => ({
    ...(await res.json()),
    ...defaultYears,
  }))

const useYears = () => {
  const { data: years, mutate: setYears } = useSWR(
    "/data/years.json",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return [years, setYears] as const
}

export default useYears
