import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"

import deaths from "../lib/deaths"

const Chart = ({ width, height, colors, disabledYears }) => (
  <LineChart width={width} height={height} data={deaths}>
    {Object.keys(deaths[0]).map((year, i) =>
      year === "month" || disabledYears[year] ? null : (
        <Line key={i} dataKey={year} type="monotone" stroke={colors[year]} />
      )
    )}
    <CartesianGrid stroke="#333" strokeDasharray="3 3" />
    <XAxis
      dy={0}
      angle={30}
      interval={0}
      dataKey="month"
      padding={{ left: 30, right: 30 }}
    />
    <YAxis />
  </LineChart>
)

export default Chart
