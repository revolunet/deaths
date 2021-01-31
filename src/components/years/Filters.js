import { useEffect, useState } from "react"
import { IoMale, IoFemale } from "react-icons/io5"

import useDeaths from "@services/deaths"
import { AgeGroups } from "@utils/deaths"
import { ButtonGroup, Button } from "@components/Buttons"

const Filters = () => {
  const [, setData] = useDeaths()
  const [age, setAge] = useState(null)
  const [gender, setGender] = useState(null)

  const handleGenderChange = (value) =>
    setGender(value === 0 ? "male" : value === 1 ? "female" : null)

  const handleAgeChange = (value) =>
    setAge(value !== null ? AgeGroups[value] : value)

  useEffect(() => setData({ age, gender }), [age, gender])

  return (
    <div className="filters">
      <div className="age">
        <ButtonGroup onChange={handleAgeChange} vertical={true}>
          <Button>0-15</Button>
          <Button>15-30</Button>
          <Button>30-45</Button>
          <Button>45-60</Button>
          <Button>60-75</Button>
          <Button>75-90</Button>
          <Button>90+</Button>
        </ButtonGroup>
      </div>
      <div className="gender">
        <ButtonGroup onChange={handleGenderChange} vertical={true}>
          <Button ariaLabel="male">
            <IoMale size="40px" />
          </Button>
          <Button ariaLabel="female">
            <IoFemale size="40px" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Filters
