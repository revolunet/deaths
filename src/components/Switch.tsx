import { useTheme } from "@/services/themes"
import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

const Switch = () => {
  const { theme, values, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="switch">
      {theme === "dark" ? (
        <FaSun
          size={24}
          color={values.primary}
          onClick={() => setTheme("light")}
        />
      ) : (
        <FaMoon
          size={24}
          color={values.primary}
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  )
}

export default Switch
