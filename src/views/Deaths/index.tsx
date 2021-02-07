import Chart from "./Chart"
import Filters from "./Filters"
import Panel from "@/components/Panel"

const Deaths = () => {
  return (
    <Panel className="deaths">
      <Chart />
      <Filters />
    </Panel>
  )
}

export default Deaths
