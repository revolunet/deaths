import AgeGroups from "./AgeGroups"
import Genders from "./Genders"
import Panel from "@/components/Panel"

import { useEffect, useState } from "react"
import useFilters from "@/services/filters"

const Groups = [
  "fifteen",
  "thirty",
  "fortyfive",
  "sixty",
  "seventyfive",
  "ninety",
  "ninetyplus",
]

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
