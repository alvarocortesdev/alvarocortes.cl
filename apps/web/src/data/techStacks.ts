export interface Technology {
  name: string
  icon: string
}

export interface TechCategory {
  id: string
  name: string
  technologies: Technology[]
}

export const TECH_STACKS: TechCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    technologies: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Vite", icon: "vite" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    technologies: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Hono", icon: "hono" },
      { name: "Express", icon: "express" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    technologies: [
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "VS Code", icon: "visualstudiocode" },
      { name: "Bun", icon: "bun" },
      { name: "Vitest", icon: "vitest" },
    ],
  },
  {
    id: "other",
    name: "Other",
    technologies: [
      { name: "Linux", icon: "linux" },
      { name: "AWS", icon: "amazonwebservices" },
      { name: "Vercel", icon: "vercel" },
      { name: "GitHub Actions", icon: "githubactions" },
    ],
  },
]
