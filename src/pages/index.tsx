import Deaths from "@/views/Deaths"
import Filters from "@/views/Filters"
import Overview from "@/views/Overview"
import Mortality from "@/views/Mortality"

function Page() {
  return (
    <>
      <Filters />
      <Deaths />
      <Overview />
      <Mortality />
    </>
  )
}

export default Page
