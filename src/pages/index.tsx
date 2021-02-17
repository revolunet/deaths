import Head from "next/head"
import Menu from "@/views/Menu"
import Deaths from "@/views/Deaths"
import Filters from "@/views/Filters"
import { useRouter } from "next/router"
import Overview from "@/views/Overview"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Mortality from "@/views/Mortality"
import Locations from "@/views/Locations"

function Page() {
  const {
    query: { view },
  } = useRouter()

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
      <Menu />
      <Filters />
      {view === "deaths" && <Deaths />}
      {view === "overview" && <Overview />}
      {view === "mortality" && <Mortality />}
      {view === "locations" && <Locations />}
      <Footer />
    </>
  )
}

export default Page
