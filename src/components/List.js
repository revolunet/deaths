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
            <div>
              <div
                className="dot"
                style={{
                  borderColor: colors[year],
                  backgroundColor: colors[year],
                }}
              ></div>
            </div>
            <div>
              <div>{year}</div>
              <div className="deaths">{getTotal(year)} décès</div>
            </div>
          </li>
        )
      )}
  </ul>
)

export default List
