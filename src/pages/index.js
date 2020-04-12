import Head from "next/head"
import React, { useRef, useEffect, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"

import deaths from "../lib/deaths"

const getColor = () => "#" + Math.random().toString(16).substr(-6)

const colors = Object.keys(deaths[0]).reduce((colors, year) => {
  colors[year] = getColor()
  return colors
}, {})

const Home = () => {
  const ref = useRef()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(400)
  const [disabledYears, setDisabledYears] = useState({})

  const toggleYear = (year) => {
    if (disabledYears[year]) delete disabledYears[year]
    else disabledYears[year] = true
    setDisabledYears({ ...disabledYears })
  }

  useEffect(() => {
    setWidth(ref.current.clientWidth)
    setHeight(ref.current.clientHeight || height)
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Décès annuels en France</h1>
        <div>
          Sources{" "}
          <a href="https://www.data.gouv.fr/fr/datasets/fichier-des-personnes-decedees">
            data.gouv.fr
          </a>
        </div>
      </header>
      <main>
        <aside>
          <ul>
            {Object.keys(deaths[0]).map((year, i) => (
              <li
                key={i}
                onClick={() => toggleYear(year)}
                className={disabledYears[year] && "disabled"}
                style={{ color: colors[year] }}
              >
                {year}
              </li>
            ))}
          </ul>
        </aside>

        <section ref={ref}>
          <LineChart width={width} height={height} data={deaths}>
            {Object.keys(deaths[0]).map((year, i) =>
              disabledYears[year] ? null : (
                <Line
                  key={i}
                  dataKey={year}
                  type="monotone"
                  stroke={colors[year]}
                />
              )
            )}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
          </LineChart>
        </section>
      </main>

      <footer>
        <div>Chewam © 2020</div>
        <div>
          version 0.1.0 (<a href="https://github.com/chewam/deaths">s3dd8f</a>)
        </div>
      </footer>
    </div>
  )
}

export default Home
