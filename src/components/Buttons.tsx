import { MouseEvent, ReactNode } from "react"
import { useState, useEffect, cloneElement } from "react"

type Props = {
  active?: boolean
  ariaLabel?: string
  className?: string
  children?: ReactNode
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined
}

export const Button = ({ active, ariaLabel, children, onClick }: Props) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel ? ariaLabel : ""}
    className={`${active ? "active" : ""}`}
  >
    {children}
  </button>
)

export const ButtonGroup = ({
  children = [],
  onChange,
  type = "horizontal",
}) => {
  const [selected, setSelected] = useState(null)

  useEffect(() => onChange && onChange(selected), [selected])

  return (
    <ul className={`button-group ${type}`}>
      {children.map((child, i) => (
        <li key={i}>
          {cloneElement(child, {
            active: i === selected,
            onClick: () => setSelected(i === selected ? null : i),
          })}
        </li>
      ))}
    </ul>
  )
}
