import Chart from "@/components/Chart"
import Panel from "@/components/Panel"
import { useTheme } from "@/services/themes"
import AgeGroups from "@/data/age-groups.json"
import useMortality from "@/services/mortality"

const Mortality = () => {
  const [deathsGroups] = useMortality()
  const { values: theme } = useTheme()

  const labels = deathsGroups[0]?.map((death) => death.year)

  const datasets = deathsGroups.map((deaths, i) => ({
    type: "bar",
    borderWidth: 3,
    label: AgeGroups[i],
    yAxisID: "y-axis-1",
    data: deaths.map((death) => death.count),
  }))

  datasets.push({
    fill: false,
    type: "line",
    label: "Ratio",
    borderWidth: 3,
    pointRadius: 5,
    yAxisID: "y-axis-2",
    borderColor: theme?.secondary,
    pointBackgroundColor: theme?.secondary,
    data: deathsGroups[0]?.map((death, i) =>
      deathsGroups.reduce((sum, deaths) => (sum += +deaths[i].ratio), 0)
    ),
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
      <Chart xAxes={xAxes} yAxes={yAxes} datasets={datasets} labels={labels} />
    </Panel>
  )
}

export default Mortality
