export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  imageUrl?: string
  liveUrl?: string
  repoUrl?: string
  featured: boolean
  details: string
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio",
    name: "Portfolio Personal",
    description:
      "Sitio web personal construido con React, TypeScript y Tailwind CSS",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    featured: true,
    details:
      "Mi portafolio personal showcasing proyectos y experiencia profesional. Construido con un stack moderno enfocado en rendimiento y experiencia de usuario fluida. Incluye animaciones con Framer Motion, diseño responsive, y despliegue automatizado con Vercel.",
    liveUrl: "https://www.alvarocortes.cl",
    repoUrl: "https://github.com/alvarocortesdev/alvarocortes.cl",
  },
  {
    id: "task-manager-api",
    name: "Task Manager API",
    description: "REST API para gestión de tareas con autenticación JWT",
    techStack: ["Node.js", "Express", "PostgreSQL", "Prisma"],
    featured: false,
    details:
      "API RESTful completa para gestión de tareas y proyectos. Implementa autenticación JWT, validación de datos con Zod, y documentación con Swagger. Base de datos PostgreSQL con migraciones manejadas por Prisma ORM.",
    repoUrl: "https://github.com/alvarocortes/",
  },
  {
    id: "ecommerce-dashboard",
    name: "E-commerce Dashboard",
    description: "Panel de administración para tienda online",
    techStack: ["React", "TypeScript", "TanStack Query", "Recharts"],
    featured: true,
    details:
      "Dashboard administrativo para e-commerce con visualización de ventas, gestión de inventario, y análisis de métricas. Utiliza TanStack Query para estado del servidor y Recharts para gráficos interactivos. Diseño responsive con modo oscuro.",
    liveUrl: "https://ecommerce-dashboard-demo.vercel.app",
  },
  {
    id: "cli-tool",
    name: "CLI Tool",
    description: "Herramienta de línea de comandos para automatización",
    techStack: ["Node.js", "Commander", "Chalk"],
    featured: false,
    details:
      "Herramienta CLI para automatizar tareas repetitivas de desarrollo. Incluye generación de boilerplate, gestión de configuraciones, y scripts de deployment. Interfaz colorida con Chalk y parsing de argumentos con Commander.",
    repoUrl: "https://github.com/alvarocortes/",
  },
]
