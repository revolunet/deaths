import Head from "next/head"

import Deaths from "@/views/Deaths"
import Filters from "@/views/Filters"
// import Overview from "@/views/Overview"
// import Mortality from "@/views/Mortality"

import Header from "@/components/Header"

function Page() {
  return (
    <>
      <Head>
        <title>French mortality figures</title>
        <link
          as="font"
          rel="preload"
          crossOrigin=""
          href="/fonts/Roboto-Regular.ttf"
        />
      </Head>
      <Header />
      <Filters />
      <Deaths />
      {/* <Overview />
      <Mortality /> */}
    </>
  )
}

export default Page
