import colors from "@data/colors"

const List = ({ years, toggleYear }) => (
  <ul className="list">
    {Object.keys(years)
      .reverse()
      .map((year, i) => (
        <li
          key={i}
          onClick={() => toggleYear(year)}
          className={years[year] ? "" : "disabled"}
        >
          <div
            className="dot"
            style={{
              borderColor: colors[year],
              backgroundColor: colors[year],
            }}
          ></div>
          <div className="year">{year}</div>
        </li>
      ))}
  </ul>
)

export default List
