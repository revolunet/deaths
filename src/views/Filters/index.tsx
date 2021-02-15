import Genders from "./Genders"
import AgeGroups from "./AgeGroups"
import Panel from "@/components/Panel"
import useFilters from "@/services/filters"

const Deaths = () => {
  const [{ ageGroup, gender }, setFilters] = useFilters()

  const handleGenderChange = (gender: string) =>
    setFilters({ ageGroup, gender })

  const handleAgeGroupChange = (event: any, newValue: [number, number]) =>
    setFilters({ ageGroup: newValue, gender })

  return (
    <Panel className="filters">
      <Genders onChange={handleGenderChange} />
      <AgeGroups onChange={handleAgeGroupChange} />
    </Panel>
  )
}

export default Deaths
