import hexToRgba from "hex-to-rgba"
import Chart from "@/components/Chart"
import Panel from "@/components/Panel"
import { useTheme } from "@/services/themes"
import useMortality from "@/services/mortality"

const average = (nums: [number]) => nums.reduce((a, b) => a + b) / nums.length

const Mortality = () => {
  const { values: theme = {} } = useTheme()
  const [{ labels, data, ratio }] = useMortality()
  const max = Math.max(...ratio)
  const defaultColor = "#ffffff"

  const bars = data.map((ageGroup: number[][], i: number) => ({
    type: "bar",
    data: ageGroup,
    borderWidth: 2,
    label: `bar-${i}`,
    yAxisID: "y-axis-1",
    backgroundColor: hexToRgba(theme.primary || defaultColor, 0.2),
  }))

  const datasets = [
    {
      fill: false,
      type: "line",
      label: "Ratio",
      borderWidth: 3,
      pointRadius: 5,
      yAxisID: "y-axis-2",
      data: ratio,
      borderColor: theme.secondary,
      pointBorderColor: theme.secondary,
      pointBackgroundColor: theme.surface,
      datalabels: {
        align: "end",
        anchor: "end",
        borderRadius: 4,
        color: theme["on-primary"],
        display: ({ dataIndex }) => dataIndex % 2,
        formatter: (value) => `${value.toFixed(2)}%`,
        backgroundColor: ({ active }) =>
          active
            ? hexToRgba(theme.secondary || defaultColor, 0.9)
            : hexToRgba(theme.secondary || defaultColor, 0.8),
      },
    },
    ...bars,
  ]

  const xAxes = [{ offset: true, stacked: true }]

  const yAxes = [
    {
      stacked: true,
      id: "y-axis-1",
      type: "linear",
      position: "left",
    },
    {
      id: "y-axis-2",
      type: "linear",
      position: "right",
      gridLines: { drawOnChartArea: false },
    },
  ]

  const annotations = max && [
    {
      value: max,
      type: "line",
      borderWidth: 2,
      mode: "horizontal",
      borderDash: [6, 3],
      scaleID: "y-axis-2",
      borderColor: theme.secondary,
      drawTime: "afterDatasetsDraw",
      label: {
        enabled: true,
        fontColor: theme["on-primary"],
        backgroundColor: theme.secondary,
        content: `${labels[ratio.indexOf(max)]}: ${max.toFixed(2)}% décès`,
      },
    },
  ]

  const datalabels = {
    color: ({ active }) => (active ? theme["on-primary"] : theme.primary),
    display: ({ active, dataset, dataIndex, chart: { scales } }) => {
      const end = scales["y-axis-1"].end
      return active || dataset.data[dataIndex] > end * 0.05
    },
    backgroundColor: ({ active }) =>
      active
        ? hexToRgba(theme.primary || defaultColor, 0.9)
        : "rgba(0, 0, 0, 0)",
    font: {
      weight: "bold",
    },
    formatter: (value, { active, datasetIndex, dataset: { data } }) =>
      active
        ? `${datasetIndex * 10}${
            datasetIndex > 10 ? "+" : `-${datasetIndex * 10 + 10}`
          }\n${value} décès`
        : value > 1000
        ? (value / 1000).toFixed() + "k"
        : Math.round,
  }

  return (
    <Panel className="mortality">
      <div style={{ flex: 1 }}>
        <Chart
          xAxes={xAxes}
          yAxes={yAxes}
          labels={labels}
          datasets={datasets}
          datalabels={datalabels}
          annotations={annotations}
        />
      </div>
    </Panel>
  )
}

export default Mortality
