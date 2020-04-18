import React from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import deaths from "../lib/deaths"

const MonthTooltip = ({ active, payload, label }) =>
  active ? (
    <div className="custom-tooltip">
      <div>{label}</div>
      {payload.reverse().map((item, i) => (
        <div key={i} style={{ color: item.color }}>
          {item.name}: {new Intl.NumberFormat("fr-FR").format(item.value)}
        </div>
      ))}
    </div>
  ) : null

const Chart = ({ colors, disabledYears }) => {
  return (
    <ResponsiveContainer>
      <LineChart
        data={deaths}
        margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
        {Object.keys(deaths[0]).map((year, i) =>
          year === "month" || disabledYears[year] ? null : (
            <Line
              key={i}
              dataKey={year}
              type="monotone"
              stroke={colors[year]}
            />
          )
        )}
        <XAxis
          dy={0}
          angle={30}
          interval={0}
          dataKey="month"
          padding={{ left: 30, right: 30 }}
        />
        <YAxis type="number" domain={[40000, 80000]} />
        <Tooltip content={<MonthTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
