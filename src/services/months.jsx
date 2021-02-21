import useSWR from "swr"

const useMonths = () => {
  const { data, mutate } = useSWR("months", null, {
    revalidateOnFocus: false,
  })

  return [data, mutate]
}

export default useMonths
