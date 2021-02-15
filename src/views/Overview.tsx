import hexToRgba from "hex-to-rgba"
import Chart from "@/components/Chart"
import Panel from "@/components/Panel"
import { useTheme } from "@/services/themes"
import useOverview from "@/services/overview"

const Overview = () => {
  const [overview] = useOverview()
  const { values: theme } = useTheme()

  const xAxes = [{}]

  const yAxes = [{}]

  const defaultColor = "#ffffff"

  const labels = overview.labels

  const datasets = [{ label: "Décès", data: overview.data }]

  const gradient: [number, string][] = [
    [0, hexToRgba(theme?.primary || defaultColor, 0.5)],
    [0.2, hexToRgba(theme?.primary || defaultColor, 0.2)],
    [0.5, hexToRgba(theme?.primary || defaultColor, 0)],
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
