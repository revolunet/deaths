import hexToRgba from "hex-to-rgba"
import Chart from "@/components/Chart"
import Panel from "@/components/Panel"
import { useTheme } from "@/services/themes"
import useOverview from "@/services/overview"

const Overview = () => {
  const [deaths] = useOverview()
  const { values: theme } = useTheme()

  const xAxes = [{}]
  const yAxes = [{}]

  const defaultColor = "#ffffff"

  const gradient: [number, string][] = [
    [0, hexToRgba(theme?.primary || defaultColor, 0.5)],
    [0.2, hexToRgba(theme?.primary || defaultColor, 0.2)],
    [0.5, hexToRgba(theme?.primary || defaultColor, 0)],
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
