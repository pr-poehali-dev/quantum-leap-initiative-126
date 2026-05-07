import { useState } from "react"
import { CartProvider } from "@/context/CartContext"
import { LinkBioPage } from "./pages/LinkBioPage"
import { CatalogPage } from "./pages/CatalogPage"
import { CartPage } from "./pages/CartPage"

type Screen = "home" | "catalog" | "cart"

function AppInner() {
  const [screen, setScreen] = useState<Screen>("home")

  if (screen === "catalog") return <CatalogPage onBack={() => setScreen("home")} onCart={() => setScreen("cart")} />
  if (screen === "cart") return <CartPage onBack={() => setScreen("catalog")} />
  return <LinkBioPage onCatalog={() => setScreen("catalog")} />
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}

export default App
