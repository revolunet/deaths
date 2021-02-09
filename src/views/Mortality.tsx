import Chart from "@/components/Chart"
import Panel from "@/components/Panel"
import { useTheme } from "@/services/themes"
import useMortality from "@/services/mortality"

const Mortality = () => {
  const [deaths] = useMortality()
  const { values: theme } = useTheme()

  const labels = deaths.map((death) => death.year)

  const datasets = [
    {
      fill: false,
      type: "line",
      label: "Ratio",
      borderWidth: 3,
      pointRadius: 5,
      yAxisID: "y-axis-2",
      borderColor: theme?.secondary,
      pointBackgroundColor: theme?.secondary,
      data: deaths.map((death) => death.ratio),
    },
    {
      type: "bar",
      label: "Count",
      borderWidth: 3,
      yAxisID: "y-axis-1",
      data: deaths.map((death) => death.count),
    },
  ]

  const xAxes = [{ offset: true }]

  const yAxes = [
    {
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

  return (
    <Panel className="mortality">
      <Chart xAxes={xAxes} yAxes={yAxes} datasets={datasets} labels={labels} />
    </Panel>
  )
}

export default Mortality
