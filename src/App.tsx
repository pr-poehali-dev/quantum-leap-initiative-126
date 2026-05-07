import { useState } from "react"
import { CartProvider } from "@/context/CartContext"
import { LinkBioPage } from "./pages/LinkBioPage"
import { CatalogPage } from "./pages/CatalogPage"
import { CartPage } from "./pages/CartPage"
import { TechnologyPage } from "./pages/TechnologyPage"
import { SignalsPage } from "./pages/SignalsPage"

type Screen = "home" | "catalog" | "cart" | "technology" | "signals"

function AppInner() {
  const [screen, setScreen] = useState<Screen>("home")

  if (screen === "catalog") return <CatalogPage onBack={() => setScreen("home")} onCart={() => setScreen("cart")} />
  if (screen === "cart") return <CartPage onBack={() => setScreen("catalog")} />
  if (screen === "technology") return <TechnologyPage onBack={() => setScreen("home")} />
  if (screen === "signals") return <SignalsPage onBack={() => setScreen("home")} />
  return (
    <LinkBioPage
      onCatalog={() => setScreen("catalog")}
      onTechnology={() => setScreen("technology")}
      onSignals={() => setScreen("signals")}
    />
  )
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}

export default App
