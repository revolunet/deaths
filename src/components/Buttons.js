import { useState, useEffect, cloneElement } from "react"

export const Button = ({ active, ariaLabel, children, handleClick }) => (
  <button
    onClick={handleClick}
    aria-label={ariaLabel ? ariaLabel : ""}
    className={`${active ? "active" : ""}`}
  >
    {children}
  </button>
)

export const ButtonGroup = ({ children, onChange, vertical }) => {
  const [selected, setSelected] = useState(null)

  useEffect(() => onChange && onChange(selected), [selected])

  return (
    <div className={`button-group ${vertical && "vertical"}`}>
      {children.map((child, i) =>
        cloneElement(child, {
          key: i,
          active: i === selected,
          handleClick: () => setSelected(i === selected ? null : i),
        })
      )}
    </div>
  )
}
