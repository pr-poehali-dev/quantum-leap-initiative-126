import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/CartContext"
import Icon from "@/components/ui/icon"

const glassCard = {
  background: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(30px) saturate(180%)",
  WebkitBackdropFilter: "blur(30px) saturate(180%)",
  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.9), 0 0 0 1px rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.06)`,
  border: "1px solid rgba(255,255,255,0.5)",
}

interface CartPageProps {
  onBack: () => void
}

type Step = "cart" | "form" | "success"

export function CartPage({ onBack }: CartPageProps) {
  const { items, increment, decrement, remove, total, count, clear } = useCart()
  const [step, setStep] = useState<Step>("cart")
  const [form, setForm] = useState({ name: "", phone: "", address: "" })
  const [loading, setLoading] = useState(false)

  const handleOrder = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    clear()
    setStep("success")
  }

  return (
    <main className="relative min-h-screen px-4 pt-6 pb-10 flex flex-col overflow-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
      <motion.div className="fixed z-0 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)", filter: "blur(60px)", top: "-10%", right: "-10%" }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="fixed z-0 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)", filter: "blur(60px)", bottom: "0%", left: "-5%" }}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
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
          <div>
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">Корзина</h1>
            <p className="text-xs text-gray-400">{count > 0 ? `${count} товар${count === 1 ? "" : count < 5 ? "а" : "ов"}` : "Пусто"}</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* STEP: cart */}
          {step === "cart" && (
            <motion.div key="cart" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="flex flex-col gap-3"
            >
              {items.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400"
                >
                  <span className="text-5xl">🛒</span>
                  <p className="text-sm">Корзина пуста</p>
                  <motion.button onClick={onBack} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className="mt-2 px-5 py-2 rounded-full text-sm font-semibold text-emerald-600"
                    style={glassCard}
                  >
                    Перейти в каталог
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  {items.map((item) => (
                    <motion.div key={item.id} layout
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                      className="rounded-2xl p-4 flex items-center gap-3"
                      style={glassCard}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                        style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.15)" }}
                      >
                        💊
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-400">{item.priceNum} ₽ × {item.qty} = <span className="text-emerald-600 font-semibold">{item.priceNum * item.qty} ₽</span></p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <motion.button whileTap={{ scale: 0.88 }} onClick={() => decrement(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 font-bold"
                          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
                        >
                          <Icon name="Minus" size={12} />
                        </motion.button>
                        <span className="text-sm font-bold text-gray-800 w-4 text-center">{item.qty}</span>
                        <motion.button whileTap={{ scale: 0.88 }} onClick={() => increment(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ background: "linear-gradient(135deg,#10b981,#14b8a6)" }}
                        >
                          <Icon name="Plus" size={12} />
                        </motion.button>
                      </div>
                      <motion.button whileTap={{ scale: 0.88 }} onClick={() => remove(item.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors shrink-0"
                      >
                        <Icon name="X" size={14} />
                      </motion.button>
                    </motion.div>
                  ))}

                  {/* Total */}
                  <motion.div layout className="rounded-2xl px-4 py-3 flex items-center justify-between" style={glassCard}>
                    <span className="text-sm text-gray-500">Итого</span>
                    <span className="text-lg font-bold text-emerald-600">{total} ₽</span>
                  </motion.div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setStep("form")}
                    className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm"
                    style={{ background: "linear-gradient(135deg,#10b981 0%,#14b8a6 100%)", boxShadow: "0 4px 16px rgba(16,185,129,0.35)" }}
                  >
                    Оформить заказ →
                  </motion.button>
                </>
              )}
            </motion.div>
          )}

          {/* STEP: form */}
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="flex flex-col gap-3"
            >
              <p className="text-sm text-gray-500 px-1">Заполните данные для доставки</p>

              {[
                { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", icon: "User" },
                { key: "phone", label: "Телефон", placeholder: "+7 (999) 000-00-00", icon: "Phone" },
                { key: "address", label: "Адрес доставки", placeholder: "Москва, ул. Примерная, 1", icon: "MapPin" },
              ].map((field) => (
                <div key={field.key} className="rounded-2xl px-4 py-3 flex items-center gap-3" style={glassCard}>
                  <Icon name={field.icon} size={16} className="text-gray-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-0.5">{field.label}</p>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-300 outline-none"
                    />
                  </div>
                </div>
              ))}

              <div className="rounded-2xl px-4 py-3 flex items-center justify-between" style={glassCard}>
                <span className="text-sm text-gray-500">Сумма заказа</span>
                <span className="text-base font-bold text-emerald-600">{total} ₽</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleOrder}
                disabled={loading || !form.name || !form.phone || !form.address}
                className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,#10b981 0%,#14b8a6 100%)", boxShadow: "0 4px 16px rgba(16,185,129,0.35)" }}
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
                    <Icon name="Loader2" size={16} />
                  </motion.div>
                ) : "Подтвердить заказ"}
              </motion.button>

              <button onClick={() => setStep("cart")} className="text-xs text-gray-400 text-center py-1 hover:text-gray-600 transition-colors">
                ← Вернуться в корзину
              </button>
            </motion.div>
          )}

          {/* STEP: success */}
          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex flex-col items-center text-center py-16 gap-4"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                style={{ background: "rgba(16,185,129,0.12)", border: "2px solid rgba(16,185,129,0.25)" }}
              >
                ✅
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Заказ оформлен!</h2>
                <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">Мы свяжемся с вами в ближайшее время<br />для подтверждения доставки</p>
              </div>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={onBack}
                className="mt-2 px-6 py-3 rounded-2xl text-white font-semibold text-sm"
                style={{ background: "linear-gradient(135deg,#10b981 0%,#14b8a6 100%)", boxShadow: "0 4px 16px rgba(16,185,129,0.3)" }}
              >
                На главную
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  )
}
