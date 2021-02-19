import useSWR from "swr"
import Years from "@/data/years.json"

const defaultYears = {
  2020: true,
  2017: true,
  2003: true,
}

// const fetcher = (url: string) => fetch(url).then((res) => res.json())

// const fetcher = (url: string) =>
//   fetch(url).then(async (res) => ({
//     ...(await res.json()),
//     ...defaultYears,
//   }))

const useYears = () => {
  const { data, mutate } = useSWR("/data/years.json", null, {
    revalidateOnFocus: false,
    initialData: { ...Years, ...defaultYears },
  })

  return [data, mutate] as const
}

export default useYears
