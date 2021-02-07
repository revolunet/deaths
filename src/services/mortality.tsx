import useSWR from "swr"

const population = {
  "2000": 60508150,
  "2001": 60941410,
  "2002": 61385070,
  "2003": 61824030,
  "2004": 62251062,
  "2005": 62730537,
  "2006": 63186117,
  "2007": 63600690,
  "2008": 63961859,
  "2009": 64304500,
  "2010": 64612939,
  "2011": 64933400,
  "2012": 65241241,
  "2013": 65564756,
  "2014": 66130873,
  "2015": 66422469,
  "2016": 66602645,
  "2017": 66774482,
  "2018": 66883761,
  "2019": 66977703,
  "2020": 67063703,
}

const getRatio = (data, year) =>
  (
    (data.reduce((count, month) => count + (month[year] || 0), 0) * 100) /
    population[year]
  ).toFixed(3)

const getCount = (data, year) =>
  data.reduce((count, month) => count + (month[year] || 0), 0)

const getData = (deaths) =>
  Object.keys(deaths[0]).reduce(
    (years, key) => (
      key !== "month" &&
        years.push({
          count: getCount(deaths, key),
          ratio: getRatio(deaths, key),
          year: key,
        }),
      years
    ),
    []
  )

const useMortality = () => {
  const { data, mutate } = useSWR("mortality", null, {
    initialData: [],
    revalidateOnFocus: false,
  })

  const setMortality = (deaths) => {
    const data = getData(deaths)
    mutate(data)
  }

  return [data, setMortality] as const
}

export default useMortality
