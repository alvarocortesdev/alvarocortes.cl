import { motion } from "framer-motion"
import { TECH_STACKS, type TechCategory, type Technology } from "../data/techStacks"
import { useState } from "react"

function TechIcon({ tech }: { tech: Technology }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <span className="text-neutral-400 text-sm">{tech.name}</span>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <img
        src={`https://cdn.simpleicons.org/${tech.icon}/white`}
        alt={tech.name}
        className="w-5 h-5"
        onError={() => setHasError(true)}
      />
      <span className="text-neutral-300 text-sm">{tech.name}</span>
    </div>
  )
}

function TechCard({ category, index }: { category: TechCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-neutral-800 rounded-lg p-5"
    >
      {/* Category Title */}
      <h3 className="text-lg font-bold text-white mb-4">
        {category.name}
      </h3>

      {/* Technologies List */}
      <div className="flex flex-col gap-3">
        {category.technologies.map((tech) => (
          <TechIcon key={tech.name} tech={tech} />
        ))}
      </div>
    </motion.div>
  )
}

export function TechStacks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {TECH_STACKS.map((category, index) => (
        <TechCard key={category.id} category={category} index={index} />
      ))}
    </div>
  )
}
