import { useState } from "react"
import { defaultYears } from "@utils/deaths"

import List from "./List"
import Chart from "./Chart"
import Filters from "./Filters"

const Years = () => {
  const [years, setYears] = useState(defaultYears)

  const toggleYear = (year) => {
    years[year] = !years[year]
    setYears({ ...years })
  }

  return (
    <>
      <aside>
        <List toggleYear={toggleYear} years={years} />
        <Filters />
      </aside>
      <figure>
        <Chart years={years} />
      </figure>
    </>
  )
}

export default Years
