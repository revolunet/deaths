import {
  Bar,
  Cell,
  Line,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ComposedChart,
  ResponsiveContainer,
} from "recharts"

import colors from "@data/colors"
import useI18n from "@utils/i18n"
import useDeaths from "@services/deaths"
import { getRatioDeaths } from "@utils/deaths"
import CustomTooltip from "@components/Tooltip"

const styles = {
  stroke: "#b3b3b3",
  gridStroke: "#666",
  lineStroke: "#3182bd",
  tick: { fontSize: 12 },
  padding: { left: 10, right: 10 },
  margin: { top: 8, right: 0, bottom: 10, left: -5 },
}

const Ratio = () => {
  const { f, fn } = useI18n()
  const [deaths] = useDeaths()
  const ratioDeaths = getRatioDeaths(deaths)

  const reference = ratioDeaths.reduce((a, b) => (a.ratio > b.ratio ? a : b))

  const referenceLabel = `${reference.year}: ${fn(reference.ratio)}% ${f(
    "mortality"
  )}`

  const tickFormatter = (value) =>
    `${fn(+value.toFixed(0), {
      minimumFractionDigits: 0,
    })}`

  const tickFormatter2Decimals = (value) =>
    `${fn(value, {
      minimumFractionDigits: 2,
    })}%`

  const toolTipRenderer = ([{ value: ratio }, { value: count }] = [{}, {}]) => (
    <>
      <div>
        {fn(ratio, { minimumFractionDigits: 2 })}% {f("mortality")}
      </div>
      <div>
        {fn(count, { minimumFractionDigits: 2 })} {f("deaths")}
      </div>
    </>
  )

  return (
    <ResponsiveContainer id="ratio-resp-container" className="ratio">
      <ComposedChart data={ratioDeaths} margin={styles.margin}>
        <CartesianGrid stroke={styles.gridStroke} strokeDasharray="3 3" />
        <XAxis
          dy={10}
          angle={30}
          dataKey="year"
          tick={styles.tick}
          stroke={styles.stroke}
          padding={styles.padding}
          interval="preserveStartEnd"
        />
        <YAxis
          dx={-5}
          type="number"
          dataKey="ratio"
          orientation="left"
          tick={styles.tick}
          stroke={styles.stroke}
          tickFormatter={tickFormatter2Decimals}
          domain={[
            (dataMin) => (+dataMin - Math.abs(dataMin) / 10).toFixed(3),
            (dataMax) => (+dataMax + dataMax / 10).toFixed(3),
          ]}
        />
        <YAxis
          type="number"
          yAxisId="right"
          dataKey="count"
          orientation="right"
          tick={styles.tick}
          stroke={styles.stroke}
          tickFormatter={tickFormatter}
          domain={[
            (dataMin) => (+dataMin - Math.abs(dataMin) / 10).toFixed(3),
            (dataMax) => (+dataMax + dataMax / 10).toFixed(0),
          ]}
        />
        <ReferenceLine
          y={reference.ratio}
          label={
            <Label
              fill={"#ccc"}
              fontSize="80%"
              value={referenceLabel}
              position="insideBottomRight"
            />
          }
          stroke={colors[reference.year]}
          strokeDasharray="3 3"
        />
        <Tooltip
          renderer={toolTipRenderer}
          content={<CustomTooltip />}
          cursor={{ fill: "#000", fillOpacity: "0.4" }}
        />
        <Bar dataKey="ratio">
          {ratioDeaths.map((ratio, index) => (
            <Cell
              fillOpacity="0.4"
              key={`cell-${index}`}
              stroke={colors[ratio.year]}
            />
          ))}
        </Bar>
        <Line
          yAxisId="right"
          dataKey="count"
          type="monotone"
          stroke={styles.lineStroke}
          dot={{ stroke: styles.stroke, r: 1 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default Ratio
