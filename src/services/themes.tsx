import useSWR from "swr"
import { ThemeProvider, useTheme as useThemes } from "next-themes"

export const useTheme = () => {
  const { resolvedTheme: theme, setTheme } = useThemes()

  const { data, mutate: setValues } = useSWR("theme", null, {
    initialData: {},
  })

  return { theme, values: data[theme], setValues, setTheme }
}

export const Themes = ({ light, dark, children }) => {
  const { setValues } = useTheme()

  setValues({ light, dark })
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
}
