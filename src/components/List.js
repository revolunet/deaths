import React from "react"

import deaths from "../lib/deaths"

const List = ({ colors, disabledYears, toggleYear }) => (
  <ul>
    {Object.keys(deaths[0]).map((year, i) =>
      year === "month" ? null : (
        <li
          key={i}
          onClick={() => toggleYear(year)}
          className={disabledYears[year] && "disabled"}
        >
          {year}
          <span
            className="dot"
            style={{ backgroundColor: colors[year] }}
          ></span>
        </li>
      )
    )}
  </ul>
)

export default List
