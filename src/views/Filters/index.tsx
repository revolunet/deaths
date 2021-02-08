import Genders from "./Genders"
import AgeGroups from "./AgeGroups"
import Panel from "@/components/Panel"
import useFilters from "@/services/filters"
import Groups from "@/data/age-groups.json"

const Deaths = () => {
  const [{ age, gender }, setFilters] = useFilters()

  const handleGenderChange = (value: number) => {
    const gender = value === 0 ? "male" : value === 1 ? "female" : null
    setFilters({ age, gender })
  }

  const handleAgeGroupChange = (value: number) => {
    const age = value !== null ? Groups[value] : null
    setFilters({ age, gender })
  }

  return (
    <Panel className="filters">
      <Genders onChange={handleGenderChange} />
      <AgeGroups onChange={handleAgeGroupChange} />
    </Panel>
  )
}

export default Deaths
