import hexToRgba from "hex-to-rgba"
import useYears from "@/services/years"
import useDeaths from "@/services/deaths"
import { useTheme } from "@/services/themes"
import DefaultChart from "@/components/Chart"

const Chart = () => {
  const [years] = useYears()
  const [deaths] = useDeaths()
  const { values: theme } = useTheme()

  const xAxes = [{}]
  const yAxes = [{}]

  const defaultColor = "#ffffff"

  const gradient: [number, string][] = [
    [0, hexToRgba(theme?.primary || defaultColor, 0.5)],
    [0.2, hexToRgba(theme?.primary || defaultColor, 0.2)],
    [0.5, hexToRgba(theme?.primary || defaultColor, 0)],
  ]

  const labels = deaths.labels

  const datasets = Object.keys(years).reduce(
    (datasets, year) => (
      years[year] &&
        datasets.push({
          pointRadius: 5,
          pointBorderWidth: 2,
          label: `Count ${year}`,
          data: deaths.data[+year - 2000],
        }),
      datasets
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
