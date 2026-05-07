import { useState } from "react"
import { LinkBioPage } from "./pages/LinkBioPage"
import { CatalogPage } from "./pages/CatalogPage"

type Screen = "home" | "catalog"

function App() {
  const [screen, setScreen] = useState<Screen>("home")

  if (screen === "catalog") {
    return <CatalogPage onBack={() => setScreen("home")} />
  }

  return <LinkBioPage onCatalog={() => setScreen("catalog")} />
}

export default App
