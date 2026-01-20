import { motion } from "framer-motion"
import { TIMELINE_DATA, type TimelineEntry } from "../data/timeline"

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const isWork = entry.type === "work"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex-shrink-0 w-64"
    >
      <div
        className={`
          bg-neutral-800 rounded-lg p-4 h-full
          border-l-4
          ${isWork ? "border-blue-500" : "border-green-500"}
        `}
      >
        {/* Type Badge */}
        <span
          className={`
            inline-block px-2 py-0.5 rounded text-xs font-medium mb-2
            ${isWork
              ? "bg-blue-500/20 text-blue-400"
              : "bg-green-500/20 text-green-400"
            }
          `}
        >
          {isWork ? "Work" : "Studies"}
        </span>

        {/* Period */}
        <div className="text-2xl font-bold text-white mb-2">
          {entry.period}
        </div>

        {/* Title */}
        <div className="text-neutral-200 font-medium mb-1">
          {entry.title}
        </div>

        {/* Organization */}
        <div className="text-neutral-400 text-sm">
          {entry.organization}
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline() {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {TIMELINE_DATA.map((entry, index) => (
          <TimelineCard key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </div>
  )
}
