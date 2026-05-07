import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const glassCard = {
  background: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(30px) saturate(180%)",
  WebkitBackdropFilter: "blur(30px) saturate(180%)",
  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.9), 0 0 0 1px rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.06)`,
  border: "1px solid rgba(255,255,255,0.5)",
}

const steps = [
  {
    num: "1",
    title: "Обработка данных",
    text: "Инструменты ИИ обрабатывают большие объёмы данных, выявляют зависимости и оптимизируют рабочие процессы.",
  },
  {
    num: "2",
    title: "Подготовка сигнала",
    text: "Выделение ключевых пиков целевых спектральных компонентов с помощью GPU и интеллектуальных методов анализа.",
  },
  {
    num: "3",
    title: "Фиксация квантовой информации",
    text: "Специальные алгоритмы обеспечивают высокую точность и надёжность квантового сигнала.",
  },
  {
    num: "4",
    title: "Квантовая коммуникация",
    text: "Протоколы передачи через программу MediaSSF — адаптация сигналов и оптимизация фильтрационных алгоритмов.",
  },
]

const applications = [
  { emoji: "🌾", title: "Сельское хозяйство", text: "Повышение продуктивности культур, снижение стрессов, улучшение качества почв" },
  { emoji: "💊", title: "Фарма & Wellness", text: "Создание квантовых аналогов лекарственных препаратов и профилактика" },
  { emoji: "🔬", title: "Материаловедение", text: "Усовершенствование известных материалов и синтез новых композитов" },
]

interface TechnologyPageProps {
  onBack: () => void
}

export function TechnologyPage({ onBack }: TechnologyPageProps) {
  return (
    <main className="relative min-h-screen px-4 pt-6 pb-12 flex flex-col overflow-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
      <motion.div className="fixed z-0 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)", filter: "blur(70px)", top: "-10%", left: "-10%" }}
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="fixed z-0 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)", filter: "blur(60px)", bottom: "5%", right: "-10%" }}
        animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
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
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">О технологии</h1>
            <p className="text-xs text-gray-400">Квантовая SSF-технология</p>
          </div>
        </motion.div>

        {/* Hero card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 280, damping: 24 }}
          className="rounded-3xl p-5 flex flex-col gap-3"
          style={{ ...glassCard, background: "rgba(255,255,255,0.6)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(56,189,248,0.15))", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              ⚛️
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-gray-800">SSF-технология</h2>
              <p className="text-[11px] text-emerald-600 font-medium">Special Signal Form</p>
            </div>
          </div>
          <p className="text-[13px] text-gray-600 leading-relaxed">
            Инновационная программная платформа на основе принципов <span className="font-semibold text-gray-800">квантовой физики</span> и <span className="font-semibold text-gray-800">искусственного интеллекта</span>. Объединяет квантово-оптические системы и ансамбли атомов, молекул и экситонов.
          </p>
        </motion.div>

        {/* Core description */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.13, type: "spring", stiffness: 280, damping: 24 }}
          className="rounded-3xl p-5" style={glassCard}
        >
          <h3 className="text-[13px] font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>🧩</span> Принцип работы
          </h3>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            Центральный элемент — модуль SSF, формирующий <span className="text-gray-700 font-medium">многослойную многомерную систему квантовых полей</span>, воспроизводящую трёхмерную голографическую структуру. Сигнал передаёт характеристики всего ансамбля частиц, а не единичного кванта.
          </p>
          <p className="text-[12px] text-gray-500 leading-relaxed mt-2">
            Для управления используется <span className="text-gray-700 font-medium">явление квантовой запутанности</span> — стабильность сигнала сохраняется независимо от расстояния. Приём возможен лишь теми структурами, собственные колебания которых согласованы с формой сигнала.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 280, damping: 24 }}
          className="rounded-3xl p-5 flex flex-col gap-4" style={glassCard}
        >
          <h3 className="text-[13px] font-bold text-gray-800 flex items-center gap-2">
            <span>⚙️</span> Создание SSF-сигнала
          </h3>
          {steps.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + i * 0.07, type: "spring", stiffness: 300, damping: 25 }}
              className="flex gap-3"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5"
                style={{ background: "linear-gradient(135deg,#10b981,#14b8a6)" }}
              >
                {step.num}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-gray-800">{step.title}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Science */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 24 }}
          className="rounded-3xl p-5" style={glassCard}
        >
          <h3 className="text-[13px] font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>🎓</span> Научное подтверждение
          </h3>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            Учёные <span className="text-gray-700 font-medium">Венского технического университета (TU Wien)</span> и <span className="text-gray-700 font-medium">Института науки и технологий Окинавы (OIST)</span> подтвердили феномен самопроизвольной сверхизлучательной мазерной генерации без внешнего стимулирования.
          </p>
          <div className="mt-2 px-3 py-2 rounded-xl text-[11px] text-emerald-700 font-medium"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
          >
            📅 Опубликовано официально 02 января 2026 года
          </div>
        </motion.div>

        {/* Applications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 280, damping: 24 }}
          className="flex flex-col gap-3"
        >
          <h3 className="text-[13px] font-bold text-gray-700 px-1 flex items-center gap-2">
            <span>🌐</span> Области применения
          </h3>
          {applications.map((app, i) => (
            <motion.div key={app.title}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 + i * 0.06, type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-2xl px-4 py-3 flex items-center gap-3" style={glassCard}
            >
              <span className="text-2xl shrink-0">{app.emoji}</span>
              <div>
                <p className="text-[12px] font-semibold text-gray-800">{app.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{app.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Conclusion */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 280, damping: 24 }}
          className="rounded-3xl p-5 text-center" style={glassCard}
        >
          <p className="text-[12px] text-gray-500 leading-relaxed italic">
            SSF-технология — значимое достижение в области квантовых технологий, объединяющее принципы квантовой оптики и многокомпонентных структур. Демонстрирует высокий уровень экологической устойчивости, безопасности и эффективности.
          </p>
          <div className="mt-3 inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold text-emerald-700"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            ⚡ Патенты · Свидетельства · Сертификаты
          </div>
        </motion.div>

      </div>
    </main>
  )
}
