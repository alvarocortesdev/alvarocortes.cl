import { motion } from "framer-motion"
import { TIMELINE_DATA, type TimelineEntry } from "../data/timeline"

function TimelineCard({ entry, index, isLast }: { entry: TimelineEntry; index: number; isLast: boolean }) {
  const isWork = entry.type === "work"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative w-full md:w-72 md:flex-shrink-0"
    >
      {/* Mobile timeline connector - vertical line on left */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:hidden">
        {/* Dot */}
        <div
          className={`
            absolute left-3 top-6 w-2.5 h-2.5 rounded-full z-10
            ${isWork ? "bg-blue-500" : "bg-green-500"}
          `}
        />
        {/* Vertical line */}
        {!isLast && (
          <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-neutral-700" />
        )}
      </div>

      {/* Card with left padding for timeline on mobile */}
      <div
        className={`
          bg-neutral-800 rounded-lg p-4 md:p-5 h-full
          border-l-4 ml-8 md:ml-0
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
    <div className="relative">
      {/* Scroll container */}
      <div
        className="
          md:overflow-x-auto md:pb-4
          md:[scrollbar-width:thin]
          md:[scrollbar-color:theme(colors.neutral.600)_transparent]
        "
      >
        {/* Flex container: vertical on mobile, horizontal on desktop */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:min-w-max">
          {TIMELINE_DATA.map((entry, index) => (
            <TimelineCard
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === TIMELINE_DATA.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Desktop scroll affordance - gradient fade on right */}
      <div
        className="
          hidden md:block
          absolute right-0 top-0 bottom-4 w-16
          bg-gradient-to-l from-neutral-900 to-transparent
          pointer-events-none
        "
      />
    </div>
  )
}
