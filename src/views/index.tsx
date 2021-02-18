import Deaths from "@/views/Deaths"
import Filters from "@/views/Filters"
import { useRouter } from "next/router"
import Overview from "@/views/Overview"
import Mortality from "@/views/Mortality"
import Locations from "@/views/Locations"

const Views = () => {
  const {
    query: { view },
  } = useRouter()

  return (
    <>
      <Filters />
      <div className="views">
        {view === "deaths" && <Deaths />}
        {/* {view === "overview" && <Overview />}
      {view === "mortality" && <Mortality />}
      {view === "locations" && <Locations />} */}
      </div>
    </>
  )
}

export default Views
