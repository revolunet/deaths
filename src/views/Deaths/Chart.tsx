import hexToRgba from "hex-to-rgba"
import useYears from "@/services/years"
import useDeaths from "@/services/deaths"
import { useTheme } from "@/services/themes"
import DefaultChart from "@/components/Chart"

const average = (nums: [number]) => nums.reduce((a, b) => a + b) / nums.length

const getMaximum = (data) => {
  if (!data) return {}
  const maximums = data.reduce((acc, year, i) => {
    const max = Math.max(...year)
    const index = year.indexOf(max)
    acc[max] = { year: 2000 + i, month: index + 1, value: max }
    return acc
  }, {})
  const keys = Object.keys(maximums).map(Number)
  const maxValue = Math.max(...keys)
  return maximums[maxValue]
}

const Chart = () => {
  const [years] = useYears()
  const [deaths] = useDeaths()
  const { values: theme } = useTheme()

  // const { data } = deaths

  const max = getMaximum(deaths.data)

  const xAxes = [{}]

  const yAxes = [
    {
      ticks: {
        suggestedMax: max && max.value + (max.value * 5) / 100,
      },
    },
  ]

  const labels = deaths["labels"] ?? []

  const defaultColor = "#ffffff"

  const gradient: [number, string][] = [
    [0, hexToRgba(theme?.primary || defaultColor, 0.5)],
    [0.2, hexToRgba(theme?.primary || defaultColor, 0.2)],
    [0.5, hexToRgba(theme?.primary || defaultColor, 0)],
  ]

  const datasets =
    years &&
    Object.keys(years).reduce(
      (datasets, year) => (
        years[year] &&
          datasets.push({
            pointRadius: 5,
            label: year,
            pointBorderColor: theme?.primary,
            pointBackgroundColor: theme?.surface,
            data: (deaths["data"] || {})[+year - 2000],
          }),
        datasets
      ),
      []
    )

  datasets &&
    datasets.map((dataset, i) => {
      dataset.datalabels = {
        align: "end",
        anchor: "end",
        display: ({ active, dataIndex, dataset: { data } }) =>
          active || data[dataIndex] > average(data),
      }
    })

  const annotations = [
    {
      type: "line",
      borderWidth: 2,
      value: max.value,
      mode: "horizontal",
      borderDash: [6, 3],
      scaleID: "y-axis-0",
      borderColor: theme?.secondary,
      drawTime: "afterDatasetsDraw",
      label: {
        enabled: true,
        fontColor: theme["on-primary"],
        backgroundColor: theme?.secondary,
        content: `${max.month}/${max.year}: ${max.value} décès`,
      },
    },
  ]

  const datalabels = {
    padding: 6,
    color: "white",
    borderRadius: 4,
    font: { weight: "bold" },
    backgroundColor: ({ active }) =>
      active
        ? hexToRgba(theme?.primary || defaultColor, 0.9)
        : hexToRgba(theme?.primary || defaultColor, 0.8),
    formatter: (value, { active, dataIndex, dataset: { label, data } }) =>
      active
        ? `${dataIndex + 1}/${label}\n${data[dataIndex]} décès`
        : (value / 1000).toFixed() + "K",
  }

  return (
    <div className="chart">
      <DefaultChart
        xAxes={xAxes}
        yAxes={yAxes}
        labels={labels}
        datasets={datasets}
        gradient={gradient}
        annotations={annotations}
        datalabels={datalabels}
      />
    </div>
  )
}

export default Chart
