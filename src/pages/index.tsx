import Head from "next/head"
import Menu from "@/components/Menu"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

import Views from "@/views/index"

const Page = () => (
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
    <Views />
    <Footer />
  </>
)

export default Page
