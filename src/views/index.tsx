import Deaths from "@/views/Deaths"
import Filters from "@/views/Filters"
import Overview from "@/views/Overview"
import { useRouter } from "next/router"
import useRawDeaths from "@/services/raw-deaths"
// import Mortality from "@/views/Mortality"
// import Locations from "@/views/Locations"

// import { ComponentTransition, AnimationTypes } from "react-component-transition"
// import { CSSTransition, TransitionGroup } from "react-transition-group"

const Views = () => {
  const {
    query: { view },
  } = useRouter()

  useRawDeaths()

  return (
    <>
      <Filters />
      <div className="views">
        {/* <ComponentTransition
        className="views"
        enterAnimation={AnimationTypes.fade.enter}
        exitAnimation={AnimationTypes.fade.exit}
      > */}
        {view === "deaths" ? (
          <Deaths />
        ) : view === "overview" ? (
          <Overview />
        ) : null}
        {/* <TransitionGroup className="views">
        <CSSTransition key={`${view}`} timeout={500} classNames="fade"> */}
        {/* {view === "deaths" ? <Deaths /> : <Overview />} */}
        {/* </CSSTransition>
      </TransitionGroup> */}
        {/* </ComponentTransition> */}
      </div>
      {/* {view === "mortality" && <Mortality />} */}
      {/* {view === "locations" && <Locations />} */}
    </>
  )
}

export default Views
