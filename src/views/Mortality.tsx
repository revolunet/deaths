import Chart from "@/components/Chart"
import Panel from "@/components/Panel"
import { useTheme } from "@/services/themes"
import useMortality from "@/services/mortality"

const Mortality = () => {
  const [mortality] = useMortality()
  const { values: theme } = useTheme()

  const labels = mortality.labels

  const datasets = mortality.data.map((ageGroup: number[][], i: number) => ({
    type: "bar",
    data: ageGroup,
    borderWidth: 2,
    label: `bar-${i}`,
    yAxisID: "y-axis-1",
  }))

  datasets.push({
    fill: false,
    type: "line",
    label: "Ratio",
    borderWidth: 3,
    pointRadius: 5,
    yAxisID: "y-axis-2",
    data: mortality.ratio,
    borderColor: theme?.secondary,
    pointBackgroundColor: theme?.secondary,
  })

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

  return (
    <Panel className="mortality">
      <div style={{ flex: 1 }}>
        <Chart
          xAxes={xAxes}
          yAxes={yAxes}
          datasets={datasets}
          labels={labels}
        />
      </div>
    </Panel>
  )
}

export default Mortality
