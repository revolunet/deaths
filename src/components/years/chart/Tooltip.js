const Tooltip = ({ active, payload, label }) =>
  active ? (
    <div className="custom-tooltip">
      <div>{label}</div>
      {payload.reverse().map((item, i) => (
        <div key={i} style={{ color: item.color }}>
          {item.name}: {new Intl.NumberFormat("fr-FR").format(item.value)}
        </div>
      ))}
    </div>
  ) : null

export default Tooltip
