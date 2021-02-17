import Chart from "./Chart"
import Panel from "@/components/Panel"
import Filters from "@/components/Filters"

const Deaths = () => {
  return (
    <Panel className="deaths">
      <div className="toto" style={{ flex: 1 }}>
        <Chart />
      </div>
      <Filters />
    </Panel>
  )
}

export default Deaths
