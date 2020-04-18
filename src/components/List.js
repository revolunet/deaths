import React from "react"

import deaths from "../lib/deaths"

const getTotal = (year) =>
  new Intl.NumberFormat("fr-FR").format(
    deaths.reduce((count, month) => count + (month[year] || 0), 0)
  )

const List = ({ colors, disabledYears, toggleYear }) => (
  <ul>
    {Object.keys(deaths[0])
      .reverse()
      .map((year, i) =>
        year === "month" ? null : (
          <li
            key={i}
            onClick={() => toggleYear(year)}
            className={disabledYears[year] && "disabled"}
          >
            <div>{year}</div>
            <div className="deaths">{getTotal(year)} décès</div>
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
