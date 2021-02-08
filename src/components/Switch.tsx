import { useTheme } from "next-themes"
import { FaMoon, FaSun } from "react-icons/fa"

const Switch = () => {
  const { resolvedTheme: theme, setTheme } = useTheme()

  return (
    <div className="switch">
      {theme === "dark" ? (
        <FaSun color="#8a85ff" size={24} onClick={() => setTheme("light")} />
      ) : (
        <FaMoon color="#8a85ff" size={24} onClick={() => setTheme("dark")} />
      )}
    </div>
  )
}

export default Switch
