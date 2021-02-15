import type { AppProps } from "next/app"
import { Themes } from "@/services/themes"

import "@/styles/index.scss"
import dark from "@/styles/themes/dark.module.scss"
import light from "@/styles/themes/light.module.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Themes light={light} dark={dark}>
      <Component {...pageProps} />
    </Themes>
  )
}

export default MyApp
