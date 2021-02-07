import useYears from "@/services/years"
import useDeaths from "@/services/deaths"
import DefaultChart from "@/components/Chart"

const Chart = () => {
  const [years] = useYears()
  const [deaths] = useDeaths()

  const xAxes = [{}]
  const yAxes = [{}]

  const gradient: [number, string][] = [
    [0, "rgba(138, 133, 255, 0.5)"],
    [0.2, "rgba(138, 133, 255, 0.1)"],
    [0.5, "rgba(0, 0, 0, 0)"],
  ]

  const labels = deaths.map((death) => death.month)

  const datasets = Object.keys(years).reduce(
    (data, year) => (
      years[year] &&
        data.push({
          pointRadius: 5,
          pointBorderWidth: 2,
          label: `Count ${year}`,
          data: deaths.map((month) => month[year]),
        }),
      data
    ),
    []
  )

  return (
    <DefaultChart
      xAxes={xAxes}
      yAxes={yAxes}
      labels={labels}
      datasets={datasets}
      gradient={gradient}
    />
  )
}

export default Chart
