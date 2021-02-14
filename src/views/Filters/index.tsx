import Genders from "./Genders"
import AgeGroups from "./AgeGroups"
import Panel from "@/components/Panel"
import useFilters from "@/services/filters"
import Groups from "@/data/age-groups.json"

const Deaths = () => {
  const [{ ageGroup, gender }, setFilters] = useFilters()

  const handleGenderChange = (value: number) => {
    const gender = value === 0 ? "male" : value === 1 ? "female" : null
    setFilters({ ageGroup, gender })
  }

  // const handleAgeGroupChange = (ageGroup: number) => {
  //   // const ageGroup = value !== null ? Groups[value] : null
  //   setFilters({ ageGroup, gender })
  // }
  const handleAgeGroupChange = (event: any, newValue: number | number[]) => {
    setFilters({ ageGroup: newValue, gender })
  }

  return (
    <Panel className="filters">
      <Genders onChange={handleGenderChange} />
      <AgeGroups onChange={handleAgeGroupChange} />
    </Panel>
  )
}

export default Deaths
