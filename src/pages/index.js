import Head from "next/head"
import React, { useRef, useEffect, useState } from "react"

import colors from "../lib/colors"
import List from "../components/List"
import Chart from "../components/Chart"

const Home = ({ colors }) => {
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
    setWidth(ref.current.clientWidth - 10)
    setHeight(ref.current.clientHeight - 10 || height)
  }, [])

  return (
    <>
      <Head>
        <title>Décès annuels en France</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>
          Décès annuels en France
          <small>
            Sources{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.data.gouv.fr/fr/datasets/fichier-des-personnes-decedees"
            >
              data.gouv.fr
            </a>
          </small>
        </h1>
      </header>
      <main>
        <aside>
          <List
            colors={colors}
            toggleYear={toggleYear}
            disabledYears={disabledYears}
          />
        </aside>

        <section ref={ref}>
          <Chart
            width={width}
            height={height}
            colors={colors}
            disabledYears={disabledYears}
          />
        </section>
      </main>

      <footer>
        <div>Chewam © 2020</div>
        <div>
          version 0.1.0 (&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/chewam/deaths"
          >
            s3dd8f
          </a>
          &nbsp;)
        </div>
      </footer>
    </>
  )
}

export async function getStaticProps() {
  return { props: { colors } }
}

export default Home
