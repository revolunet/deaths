import Head from "next/head"
import React, { useState } from "react"

import List from "@components/List"
import Footer from "@components/Footer"
import Header from "@components/Header"
import Overview from "@components/Overview"
import { defaultYears } from "@utils/deaths"
import YearsView from "@components/YearsView"

const Home = () => {
  const [years, setYearsState] = useState(defaultYears)

  const toggleYear = (year) => {
    years[year] = !years[year]
    setYearsState({ ...years })
  }

  const Meta = () => (
    <Head>
      <title>Décès annuels en France</title>
      <link rel="icon" href="/favicon.png" />
      <meta
        name="description"
        content="Statistiques annuelles des décès en France de 2010 à nos jours."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  )

  return (
    <>
      <Meta />
      <Header />
      <main>
        <section className="top">
          <aside>
            <List toggleYear={toggleYear} years={years} />
          </aside>
          <figure>
            <YearsView years={years} />
          </figure>
        </section>
        <section className="bottom">
          <Overview />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
