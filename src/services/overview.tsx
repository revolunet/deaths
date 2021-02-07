import useSWR from "swr"

const Months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
]

const getData = (deaths) =>
  deaths
    .reduce(
      (result, death) =>
        result.concat(
          Object.keys(death).reduce(
            (months, key) => (
              key !== "month" &&
                months.push({
                  year: key,
                  value: death[key],
                  month: death.month,
                  label: `${death.month} ${key}`,
                  date: new Date(
                    +key,
                    Months.indexOf(death.month),
                    15
                  ).getTime(),
                }),
              months
            ),
            []
          )
        ),
      []
    )
    .sort((a, b) => a.date - b.date)

const useOverview = () => {
  const { data, mutate } = useSWR("overview", null, {
    initialData: [],
    revalidateOnFocus: false,
  })

  const setOverview = (deaths) => {
    const data = getData(deaths)
    mutate(data)
  }

  return [data, setOverview] as const
}

export default useOverview
