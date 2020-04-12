import deaths from "./deaths"

const getColor = () => "#" + Math.random().toString(16).substr(-6)

const colors = Object.keys(deaths[0]).reduce((colors, year) => {
  colors[year] = getColor()
  return colors
}, {})

export default colors
