import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useCart, type Product } from "@/context/CartContext"

const categories = [
  { id: "all", label: "Все", emoji: "💊" },
  { id: "cold", label: "Простуда", emoji: "🤧" },
  { id: "heart", label: "Сердце", emoji: "❤️" },
  { id: "vitamins", label: "Витамины", emoji: "🌿" },
  { id: "pain", label: "Боль", emoji: "🩹" },
]

const products: Product[] = [
  { id: 1, name: "Парацетамол", category: "pain", description: "Обезболивающее и жаропонижающее", price: "89 ₽", priceNum: 89, badge: "Хит", badgeColor: "bg-emerald-100 text-emerald-700" },
  { id: 2, name: "Витамин C 1000", category: "vitamins", description: "Иммунитет и защита от ОРВИ", price: "320 ₽", priceNum: 320, badge: "Новинка", badgeColor: "bg-sky-100 text-sky-700" },
  { id: 3, name: "АнтиГрипп", category: "cold", description: "Комплексное средство от гриппа", price: "215 ₽", priceNum: 215, badge: "Популярное", badgeColor: "bg-violet-100 text-violet-700" },
  { id: 4, name: "Аспирин Кардио", category: "heart", description: "Профилактика сердечно-сосудистых", price: "178 ₽", priceNum: 178, badge: null },
  { id: 5, name: "Ибупрофен", category: "pain", description: "Снятие воспаления и боли", price: "95 ₽", priceNum: 95, badge: "Хит", badgeColor: "bg-emerald-100 text-emerald-700" },
  { id: 6, name: "Omega-3", category: "vitamins", description: "Жирные кислоты для здоровья", price: "560 ₽", priceNum: 560, badge: null },
  { id: 7, name: "Терафлю", category: "cold", description: "Быстрое облегчение симптомов", price: "290 ₽", priceNum: 290, badge: null },
  { id: 8, name: "Конкор", category: "heart", description: "Нормализация давления", price: "430 ₽", priceNum: 430, badge: null },
]

const glassCard = {
  background: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(30px) saturate(180%)",
  WebkitBackdropFilter: "blur(30px) saturate(180%)",
  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.9), 0 0 0 1px rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04)`,
  border: "1px solid rgba(255,255,255,0.5)",
}

interface CatalogPageProps {
  onBack: () => void
  onCart: () => void
}

export function CatalogPage({ onBack, onCart }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")
  const { add, decrement, items, count } = useCart()

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const getQty = (id: number) => items.find((i) => i.id === id)?.qty ?? 0
  const cartTotal = items.reduce((s, i) => s + i.priceNum * i.qty, 0)

  return (
    <main className="relative min-h-screen px-4 pt-6 pb-28 flex flex-col overflow-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
      <motion.div className="fixed z-0 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)", filter: "blur(60px)", top: "-10%", right: "-10%" }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="fixed z-0 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)", filter: "blur(60px)", bottom: "0%", left: "-5%" }}
        animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-[420px] w-full flex flex-col gap-5">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex items-center gap-3"
        >
          <motion.button onClick={onBack} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600"
            style={glassCard}
          >
            <Icon name="ArrowLeft" size={18} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">Каталог</h1>
            <p className="text-xs text-gray-400">Лекарства и препараты</p>
          </div>
          <motion.button onClick={onCart} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600"
            style={glassCard}
          >
            <Icon name="ShoppingCart" size={18} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key="badge"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#10b981,#14b8a6)" }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 300, damping: 24 }}
        >
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={glassCard}>
            <Icon name="Search" size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Найти препарат..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, type: "spring", stiffness: 300, damping: 24 }}
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => (
            <motion.button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap"
              style={activeCategory === cat.id
                ? { background: "rgba(16,185,129,0.15)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(16,185,129,0.4)", color: "#059669", boxShadow: "0 2px 8px rgba(16,185,129,0.15)" }
                : { background: "rgba(255,255,255,0.45)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.5)", color: "#6b7280", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
              }
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products grid */}
        <motion.div layout className="grid grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => {
              const qty = getQty(product.id)
              return (
                <motion.div key={product.id} layout
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="rounded-2xl p-4 flex flex-col gap-2"
                  style={glassCard}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.15)" }}
                  >
                    💊
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[13px] font-semibold text-gray-800 leading-tight">{product.name}</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-emerald-600">{product.price}</span>
                    {product.badge && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${product.badgeColor}`}>{product.badge}</span>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {qty === 0 ? (
                      <motion.button key="add"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        whileTap={{ scale: 0.94 }} onClick={() => add(product)}
                        className="w-full mt-1 py-1.5 rounded-xl text-[12px] font-semibold text-white"
                        style={{ background: "linear-gradient(135deg,#10b981 0%,#14b8a6 100%)", boxShadow: "0 2px 8px rgba(16,185,129,0.3)" }}
                      >
                        В корзину
                      </motion.button>
                    ) : (
                      <motion.div key="counter"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center justify-between mt-1 rounded-xl overflow-hidden"
                        style={{ background: "linear-gradient(135deg,#10b981 0%,#14b8a6 100%)", boxShadow: "0 2px 8px rgba(16,185,129,0.3)" }}
                      >
                        <motion.button whileTap={{ scale: 0.88 }} onClick={() => decrement(product.id)}
                          className="px-3 py-1.5 text-white font-bold text-base"
                        >
                          −
                        </motion.button>
                        <span className="text-[12px] font-bold text-white">{qty}</span>
                        <motion.button whileTap={{ scale: 0.88 }} onClick={() => add(product)}
                          className="px-3 py-1.5 text-white font-bold text-base"
                        >
                          +
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm">Ничего не найдено</p>
          </motion.div>
        )}
      </div>

      {/* Floating cart bar */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4"
          >
            <motion.button onClick={onCart} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl text-white font-semibold text-sm"
              style={{ background: "linear-gradient(135deg,#10b981 0%,#14b8a6 100%)", boxShadow: "0 8px 32px rgba(16,185,129,0.45)" }}
            >
              <Icon name="ShoppingCart" size={18} />
              <span>Корзина · {count} шт. · {cartTotal} ₽</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
