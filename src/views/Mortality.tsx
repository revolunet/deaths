import Chart from "@/components/Chart"
import Panel from "@/components/Panel"
import useMortality from "@/services/mortality"

const Mortality = () => {
  const [deaths] = useMortality()

  const labels = deaths.map((death) => death.year)

  const datasets = [
    {
      fill: false,
      type: "line",
      label: "Count",
      borderWidth: 3,
      pointRadius: 5,
      yAxisID: "y-axis-2",
      borderColor: "#03dac6",
      pointBackgroundColor: "#03dac6",
      data: deaths.map((death) => death.count),
    },
    {
      type: "bar",
      label: "Ratio",
      borderWidth: 3,
      yAxisID: "y-axis-1",
      data: deaths.map((death) => death.ratio),
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
