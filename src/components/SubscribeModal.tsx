import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

interface Signal {
  name: string
  emoji: string
  description: string
}

interface SubscribeModalProps {
  signal: Signal | null
  onClose: () => void
}

type Step = "plan" | "form" | "success"

const plans = [
  {
    id: "month",
    label: "1 месяц",
    price: "990 ₽",
    per: "/ месяц",
    hint: "",
    popular: false,
  },
  {
    id: "quarter",
    label: "3 месяца",
    price: "2 490 ₽",
    per: "/ 3 мес",
    hint: "Экономия 480 ₽",
    popular: true,
  },
  {
    id: "year",
    label: "12 месяцев",
    price: "7 990 ₽",
    per: "/ год",
    hint: "Экономия 3 890 ₽",
    popular: false,
  },
]

export function SubscribeModal({ signal, onClose }: SubscribeModalProps) {
  const [step, setStep] = useState<Step>("plan")
  const [selectedPlan, setSelectedPlan] = useState("quarter")
  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [loading, setLoading] = useState(false)

  if (!signal) return null

  const plan = plans.find((p) => p.id === selectedPlan)!

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1600))
    setLoading(false)
    setStep("success")
  }

  const handleClose = () => {
    setStep("plan")
    setForm({ name: "", email: "", phone: "" })
    setSelectedPlan("quarter")
    onClose()
  }

  const glassModal = {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    boxShadow: "0 8px 48px rgba(0,0,0,0.14), inset 0 1px 1px rgba(255,255,255,0.9)",
    border: "1px solid rgba(255,255,255,0.6)",
  }

  const glassInput = {
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.06)",
    border: "1px solid rgba(255,255,255,0.5)",
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4"
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="w-full max-w-[420px] rounded-3xl p-5 flex flex-col gap-4"
          style={glassModal}
        >
          {/* Handle */}
          <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto -mt-1" />

          {/* Signal header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
              style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
            >
              {signal.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-violet-500 font-semibold uppercase tracking-wide">Подписка</p>
              <h2 className="text-[15px] font-bold text-gray-800 truncate">Сигнал «{signal.name}»</h2>
            </div>
            <motion.button onClick={handleClose} whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600"
              style={{ background: "rgba(0,0,0,0.05)" }}
            >
              <Icon name="X" size={14} />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1 — выбор тарифа */}
            {step === "plan" && (
              <motion.div key="plan"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="flex flex-col gap-3"
              >
                <p className="text-[12px] text-gray-500">Выберите период подписки:</p>

                {plans.map((p) => (
                  <motion.button key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    className="relative flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-all"
                    style={selectedPlan === p.id
                      ? { background: "rgba(139,92,246,0.1)", border: "1.5px solid rgba(139,92,246,0.4)", boxShadow: "0 2px 12px rgba(139,92,246,0.12)" }
                      : { ...glassInput }
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPlan === p.id ? "border-violet-500" : "border-gray-300"}`}>
                        {selectedPlan === p.id && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800">{p.label}</p>
                        {p.hint && <p className="text-[10px] text-emerald-600 font-medium">{p.hint}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-bold text-gray-800">{p.price}</p>
                      <p className="text-[10px] text-gray-400">{p.per}</p>
                    </div>
                    {p.popular && (
                      <span className="absolute -top-2 right-3 text-[10px] font-bold text-white px-2 py-0.5 rounded-full"
                        style={{ background: "linear-gradient(135deg,#8b5cf6,#7c3aed)" }}
                      >
                        Популярный
                      </span>
                    )}
                  </motion.button>
                ))}

                <motion.button
                  onClick={() => setStep("form")}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm mt-1"
                  style={{ background: "linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%)", boxShadow: "0 4px 16px rgba(139,92,246,0.4)" }}
                >
                  Продолжить · {plan.price}
                </motion.button>

                <p className="text-[10px] text-gray-400 text-center">
                  Отмена подписки в любое время · Без скрытых платежей
                </p>
              </motion.div>
            )}

            {/* STEP 2 — данные */}
            {step === "form" && (
              <motion.div key="form"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}
                >
                  <Icon name="CheckCircle2" size={14} className="text-violet-500 shrink-0" />
                  <p className="text-[11px] text-violet-600 font-medium">
                    Тариф: {plan.label} · {plan.price}
                  </p>
                  <button onClick={() => setStep("plan")} className="ml-auto text-[10px] text-violet-400 hover:text-violet-600 underline">
                    Изменить
                  </button>
                </div>

                {[
                  { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", icon: "User" },
                  { key: "email", label: "Email", placeholder: "example@mail.ru", icon: "Mail" },
                  { key: "phone", label: "Телефон", placeholder: "+7 (999) 000-00-00", icon: "Phone" },
                ].map((field) => (
                  <div key={field.key} className="rounded-2xl px-4 py-3 flex items-center gap-3" style={glassInput}>
                    <Icon name={field.icon} size={15} className="text-gray-400 shrink-0" />
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

                <motion.button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.email || !form.phone}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%)", boxShadow: "0 4px 16px rgba(139,92,246,0.4)" }}
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
                      <Icon name="Loader2" size={16} />
                    </motion.div>
                  ) : "Оформить подписку"}
                </motion.button>

                <p className="text-[10px] text-gray-400 text-center">
                  Нажимая кнопку, вы соглашаетесь с условиями использования сервиса
                </p>
              </motion.div>
            )}

            {/* STEP 3 — успех */}
            {step === "success" && (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex flex-col items-center text-center py-6 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: "rgba(139,92,246,0.1)", border: "2px solid rgba(139,92,246,0.25)" }}
                >
                  ✅
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Подписка оформлена!</h2>
                  <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                    Сигнал «{signal.name}» активирован.<br />
                    Детали отправлены на <span className="font-semibold text-violet-600">{form.email}</span>
                  </p>
                </div>
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="px-6 py-3 rounded-2xl text-white font-semibold text-sm"
                  style={{ background: "linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%)", boxShadow: "0 4px 16px rgba(139,92,246,0.3)" }}
                >
                  Отлично!
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
