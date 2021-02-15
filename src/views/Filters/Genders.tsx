import { useState, useEffect } from "react"
import { IoMaleSharp, IoFemaleSharp } from "react-icons/io5"

const Genders = ({ onChange }) => {
  const [gender, setGender] = useState(null)

  useEffect(() => onChange(gender), [gender])

  return (
    <div className="genders">
      <IoMaleSharp
        size={28}
        className={`icon ${gender === "male" ? "active" : ""}`}
        onClick={() => setGender(gender === "male" ? null : "male")}
      />
      <IoFemaleSharp
        size={28}
        className={`icon ${gender === "female" ? "active" : ""}`}
        onClick={() => setGender(gender === "female" ? null : "female")}
      />
    </div>
  )
}

export default Genders
