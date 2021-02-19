import Deaths from "@/views/Deaths"
import Filters from "@/views/Filters"
import Overview from "@/views/Overview"
import { useRouter } from "next/router"
import Mortality from "@/views/Mortality"
import Locations from "@/views/Locations"
import useRawDeaths from "@/services/raw-deaths"
import useRawMortality from "@/services/raw-mortality"
import useRawLocations from "@/services/raw-locations"

// import { CSSTransition, TransitionGroup } from "react-transition-group"
import { ComponentTransition, AnimationTypes } from "react-component-transition"

const Views = () => {
  const {
    query: { view },
  } = useRouter()

  useRawDeaths()
  useRawMortality()
  useRawLocations()

  return (
    <>
      <Filters />
      <ComponentTransition
        className="views"
        enterAnimation={AnimationTypes.fade.enter}
        exitAnimation={AnimationTypes.fade.exit}
      >
        {view === "deaths" ? (
          <Deaths />
        ) : view === "overview" ? (
          <Overview />
        ) : view === "mortality" ? (
          <Mortality />
        ) : view === "locations" ? (
          <Locations />
        ) : (
          <div className="views">DASHBOARD</div>
        )}
      </ComponentTransition>
      {/* </div> */}
      {/* <TransitionGroup className="views">
        <CSSTransition key={`${view}`} timeout={500} classNames="fade"> */}
      {/* {view === "deaths" ? <Deaths /> : <Overview />} */}
      {/* </CSSTransition>
      </TransitionGroup> */}
      {/* {view === "mortality" && <Mortality />} */}
      {/* {view === "locations" && <Locations />} */}
    </>
  )
}

export default Views
