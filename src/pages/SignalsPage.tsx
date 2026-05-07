import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import { SubscribeModal } from "@/components/SubscribeModal"

const signals = [
  {
    id: 1,
    name: "Антивирус",
    description: "SSF-Антивирус — ваш ежедневный цифровой щит от простуды и гриппа.",
    price: "Бесплатно",
    isFree: true,
    tags: ["Гонконгский грипп", "Сезонный грипп"],
    emoji: "🛡️",
    category: "immunity",
  },
  {
    id: 2,
    name: "Обезболивание",
    description: "Комплекс оздоровительных сигналов для снятия болей различного происхождения.",
    price: "Подписка",
    isFree: false,
    tags: ["Боли в спине", "Боли в суставах", "Мышечные боли", "Головные боли", "Мигрень"],
    emoji: "🩹",
    category: "pain",
  },
  {
    id: 3,
    name: "Антиоксиданты",
    description: "Медитативная wellness-практика на основе мощных антиоксидантов.",
    price: "Подписка",
    isFree: false,
    tags: ["Фукоидан", "Коэнзим Q10", "Селен", "Дигидрокверцетин"],
    emoji: "🌿",
    category: "wellness",
  },
  {
    id: 4,
    name: "Иммунология и восстановление",
    description: "SSF-сигнал для противовоспалительной и регенеративной поддержки организма.",
    price: "Подписка",
    isFree: false,
    tags: ["Тамерит®"],
    emoji: "🔄",
    category: "immunity",
  },
  {
    id: 5,
    name: "Синдром хронической усталости",
    description: "Комплексный сигнал на основе L-карнитина, Серотонина, MgB6 — без нагрузки на организм.",
    price: "Подписка",
    isFree: false,
    tags: ["Серотонин", "L-карнитин"],
    emoji: "⚡",
    category: "energy",
  },
  {
    id: 6,
    name: "Здоровая печень",
    description: "Специализированный SSF-сигнал для поддержки функций печени.",
    price: "Подписка",
    isFree: false,
    tags: ["Функции печени"],
    emoji: "🫀",
    category: "health",
  },
  {
    id: 7,
    name: "Урология",
    description: "Сигнал на основе Тамерита, Тестостерона и Омника — без нагрузки на организм.",
    price: "Подписка",
    isFree: false,
    tags: ["Мужская сила"],
    emoji: "💪",
    category: "health",
  },
  {
    id: 8,
    name: "Иммунитет",
    description: "Сигнал для активации иммунной системы на основе Тимозина.",
    price: "Подписка",
    isFree: false,
    tags: ["Тимозин", "Активация иммунной системы"],
    emoji: "🧬",
    category: "immunity",
  },
  {
    id: 9,
    name: "Косметика",
    description: "Повышает выработку коллагена самим организмом — без химических добавок и инъекций.",
    price: "Подписка",
    isFree: false,
    tags: ["Без химических добавок", "Без инъекций", "Без боли"],
    emoji: "✨",
    category: "beauty",
  },
  {
    id: 10,
    name: "Коррекция псориаза",
    description: "Аналог эффективного крема — без гормонов и побочных эффектов.",
    price: "Подписка",
    isFree: false,
    tags: ["Без гормонов", "Без побочных эффектов"],
    emoji: "🌸",
    category: "beauty",
  },
  {
    id: 11,
    name: "Похудение",
    description: "Специализированный SSF-сигнал — без химии, инъекций и гормонов.",
    price: "Подписка",
    isFree: false,
    tags: ["Без гормонов", "Без побочных эффектов"],
    emoji: "⚖️",
    category: "wellness",
  },
  {
    id: 12,
    name: "Поджелудочная",
    description: "Поддержка поджелудочной железы без химических добавок и гормонов.",
    price: "Подписка",
    isFree: false,
    tags: ["Без гормонов", "Без побочных эффектов"],
    emoji: "🫁",
    category: "health",
  },
  {
    id: 13,
    name: "АнтиАкне",
    description: "Снижение частоты рецидивов акне — без химии, инъекций и гормонов.",
    price: "Подписка",
    isFree: false,
    tags: ["Без гормонов", "Снижение частоты рецидивов"],
    emoji: "🌙",
    category: "beauty",
  },
  {
    id: 14,
    name: "АнтиТревога, АнтиБессоница",
    description: "Комплексный сигнал без седативного эффекта для нормализации сна и тревожности.",
    price: "Подписка",
    isFree: false,
    tags: ["Без седативного эффекта"],
    emoji: "😌",
    category: "mind",
  },
  {
    id: 15,
    name: "Внимание и Память",
    description: "SSF-сигнал для улучшения когнитивных функций без седативного эффекта.",
    price: "Подписка",
    isFree: false,
    tags: ["Без седативного эффекта"],
    emoji: "🧠",
    category: "mind",
  },
  {
    id: 16,
    name: "Работоспособность",
    description: "Повышение мотивации и устойчивости к нагрузкам, снижение утомляемости.",
    price: "Подписка",
    isFree: false,
    tags: ["Повышение мотивации", "Снижает утомляемость", "Работоспособность"],
    emoji: "🚀",
    category: "energy",
  },
  {
    id: 17,
    name: "Обмен веществ",
    description: "Поддержка когнитивного здоровья, энергии, сил, настроения и иммунитета.",
    price: "Подписка",
    isFree: false,
    tags: ["Когнитивное здоровье", "Энергия", "Настроение", "Иммунитет"],
    emoji: "🔥",
    category: "energy",
  },
  {
    id: 18,
    name: "Мелатонин",
    description: "SSF-сигнал для нормализации сна и восстановления суточных ритмов.",
    price: "Подписка",
    isFree: false,
    tags: ["Нормализация сна"],
    emoji: "🌛",
    category: "mind",
  },
  {
    id: 19,
    name: "АнтиУтомляемость",
    description: "Нормализация нервной системы и восстановление ресурсов организма.",
    price: "Подписка",
    isFree: false,
    tags: ["Нормализация нервной системы"],
    emoji: "🌊",
    category: "energy",
  },
]

const categories = [
  { id: "all", label: "Все", emoji: "⚛️" },
  { id: "immunity", label: "Иммунитет", emoji: "🛡️" },
  { id: "pain", label: "Боль", emoji: "🩹" },
  { id: "energy", label: "Энергия", emoji: "⚡" },
  { id: "mind", label: "Разум", emoji: "🧠" },
  { id: "beauty", label: "Красота", emoji: "✨" },
  { id: "wellness", label: "Wellness", emoji: "🌿" },
  { id: "health", label: "Здоровье", emoji: "❤️" },
]

const glassCard = {
  background: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(30px) saturate(180%)",
  WebkitBackdropFilter: "blur(30px) saturate(180%)",
  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.9), 0 0 0 1px rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.06)`,
  border: "1px solid rgba(255,255,255,0.5)",
}

interface SignalsPageProps {
  onBack: () => void
}

export function SignalsPage({ onBack }: SignalsPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [selectedSignal, setSelectedSignal] = useState<typeof signals[0] | null>(null)

  const filtered = signals.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main className="relative min-h-screen px-4 pt-6 pb-12 flex flex-col overflow-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
      <motion.div className="fixed z-0 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)", filter: "blur(70px)", top: "-10%", right: "-10%" }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="fixed z-0 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter: "blur(60px)", bottom: "0%", left: "-5%" }}
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
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 shrink-0"
            style={glassCard}
          >
            <Icon name="ArrowLeft" size={18} />
          </motion.button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">Выбор сигнала</h1>
            <p className="text-xs text-gray-400">Библиотека SSF-сигналов · {signals.length} сигналов</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 300, damping: 24 }}
        >
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={glassCard}>
            <Icon name="Search" size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Найти сигнал..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 300, damping: 24 }}
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => (
            <motion.button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap"
              style={activeCategory === cat.id
                ? { background: "rgba(16,185,129,0.15)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(16,185,129,0.4)", color: "#059669", boxShadow: "0 2px 8px rgba(16,185,129,0.15)" }
                : { background: "rgba(255,255,255,0.45)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.5)", color: "#6b7280" }
              }
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Signals list */}
        <AnimatePresence mode="popLayout">
          {filtered.map((signal, i) => (
            <motion.div key={signal.id} layout
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04, type: "spring", stiffness: 320, damping: 26 }}
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={glassCard}
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: signal.isFree ? "rgba(16,185,129,0.12)" : "rgba(139,92,246,0.1)", border: `1px solid ${signal.isFree ? "rgba(16,185,129,0.2)" : "rgba(139,92,246,0.15)"}` }}
                >
                  {signal.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[14px] font-bold text-gray-800">Сигнал «{signal.name}»</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${signal.isFree ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"}`}>
                      {signal.price}
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{signal.description}</p>
                </div>
              </div>

              {signal.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {signal.tags.map((tag) => (
                    <span key={tag}
                      className="text-[10px] text-gray-500 px-2 py-1 rounded-lg"
                      style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedSignal(signal)}
                className="w-full py-2 rounded-xl text-[12px] font-semibold"
                style={signal.isFree
                  ? { background: "linear-gradient(135deg,#10b981,#14b8a6)", color: "white", boxShadow: "0 2px 8px rgba(16,185,129,0.3)" }
                  : { background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(124,58,237,0.1))", color: "#7c3aed", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 2px 8px rgba(139,92,246,0.12)" }
                }
              >
                {signal.isFree ? "Получить бесплатно" : "Оформить подписку →"}
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm">Ничего не найдено</p>
          </motion.div>
        )}

      </div>

      <SubscribeModal
        signal={selectedSignal}
        onClose={() => setSelectedSignal(null)}
      />
    </main>
  )
}