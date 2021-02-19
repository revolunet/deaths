import Link from "next/link"
import { useRouter } from "next/router"

const Menu = () => {
  const {
    query: { view },
  } = useRouter()

  const items = [
    { label: "Tableau de board" },
    { label: "Comparaison", view: "deaths" },
    { label: "Vue d'Ensemble", view: "overview" },
    { label: "Mortalité", view: "mortality" },
    { label: "Localisations", view: "locations" },
  ]

  return (
    <ul className="menu">
      {items.map((item, i) => (
        <li key={i} className={`${view === items[i].view ? "active" : ""}`}>
          <Link
            href={{
              pathname: "/",
              query: items[i].view && { view: items[i].view },
            }}
            shallow={true}
          >
            <a>{items[i].label}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Menu
