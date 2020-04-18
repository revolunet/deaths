import Head from "next/head"
import React, { useRef, useEffect, useState } from "react"

import colors from "../lib/colors"
import List from "../components/List"
import Chart from "../components/Chart"
import Footer from "../components/Footer"
import Header from "../components/Header"

const Home = ({ colors }) => {
  const ref = useRef()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(400)

  const [disabledYears, setDisabledYears] = useState({
    2010: true,
    2011: true,
    2012: true,
    2013: true,
    2014: true,
    2015: true,
    2016: true,
  })

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
        <meta
          name="description"
          content="Statistiques annuelles des décès en France de 2010 à nos jours."
        />
      </Head>

      <Header />
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

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  return { props: { colors } }
}

export default Home
