import Chart from "@/components/Chart"
import Panel from "@/components/Panel"
import useOverview from "@/services/overview"

const Overview = () => {
  const [deaths] = useOverview()

  const xAxes = [{}]
  const yAxes = [{}]

  const gradient: [number, string][] = [
    [0, "rgba(138, 133, 255, 0.5)"],
    [0.2, "rgba(138, 133, 255, 0.1)"],
    [0.5, "rgba(0, 0, 0, 0)"],
  ]

  const labels = deaths.map((month) => month.label)

  const datasets = [
    {
      label: "Count",
      data: deaths.map((month) => month.value),
    },
  ]

  return (
    <Panel className="overview">
      <Chart
        xAxes={xAxes}
        yAxes={yAxes}
        labels={labels}
        datasets={datasets}
        gradient={gradient}
      />
    </Panel>
  )
}

export default Overview
