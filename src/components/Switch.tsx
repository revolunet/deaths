import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

const Switch = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="switch">
      {(theme || resolvedTheme) === "dark" ? (
        <FaSun color="#8a85ff" size={24} onClick={() => setTheme("light")} />
      ) : (
        <FaMoon color="#8a85ff" size={24} onClick={() => setTheme("dark")} />
      )}
    </div>
  )
}

export default Switch
