const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.portfolio': 'Portafolio',
    'nav.blog': 'Blog',

    // Banner
    'banner.role': 'Full Stack Developer',

    // Bio
    'bio.p1': 'Desarrollador Full Stack con foco en experiencias web eficientes y robustas. Trabajo principalmente con React y JavaScript, integrando APIs REST, bases de datos PGSQL y flujos modernos de despliegue y automatización.',
    'bio.p2': 'Además del desarrollo, tengo experiencia aplicando inteligencia artificial y RAG en soluciones reales, junto con automatización de procesos mediante n8n y scripts a medida. Destaco por mis habilidades comunicacionales y de liderazgo, adquiridas trabajando estrechamente con usuarios finales y guiando equipos de trabajo.',

    // Home page sections
    'home.trajectory': 'Mi Trayectoria',
    'home.techStack': 'Tech Stack',
    'home.projects': 'Proyectos',

    // Timeline
    'timeline.work': 'Trabajo',
    'timeline.studies': 'Estudios',
    'timeline.errorLoad': 'Error al cargar la trayectoria',
    'timeline.empty': 'Sin entradas en la trayectoria.',

    // Tech Stacks
    'tech.errorLoad': 'Error al cargar tech stacks',
    'tech.empty': 'Sin categorías de tecnología.',

    // Projects
    'projects.errorLoad': 'Error al cargar proyectos',
    'projects.empty': 'Sin proyectos.',
    'projects.live': 'Live',
    'projects.code': 'Code',

    // Project Modal
    'projectModal.about': 'Acerca de',
    'projectModal.techStack': 'Tech Stack',
    'projectModal.links': 'Enlaces',
    'projectModal.viewLive': 'Ver en vivo',
    'projectModal.viewCode': 'Ver código',

    // Blog
    'blog.title': 'Blog',
    'blog.search': 'Buscar',
    'blog.searchPlaceholder': 'Buscar publicaciones...',
    'blog.tags': 'Etiquetas',
    'blog.categories': 'Categorías',

    // Blog categories (display translations for EN-stored values)
    'category.Development': 'Desarrollo',
    'category.Design': 'Diseño',
    'category.DevOps': 'DevOps',
    'category.AI': 'IA',
    'category.Career': 'Carrera',
    'category.Tutorial': 'Tutorial',
    'category.Other': 'Otro',

    // Blog Listing
    'blogListing.errorLoad': 'Error al cargar publicaciones',
    'blogListing.errorRetry': 'Por favor, inténtalo más tarde.',
    'blogListing.noResults': 'No se encontraron publicaciones',
    'blogListing.noResultsHint': 'Intenta ajustar tus filtros.',

    // Post Detail
    'post.notFound': 'Publicación no encontrada',
    'post.backToBlog': 'Volver al blog',

    // Pagination
    'pagination.previous': 'Anterior',
    'pagination.next': 'Siguiente',
    'pagination.page': 'Página {current} de {total}',

    // Share
    'share.label': 'Compartir:',

    // Footer
    'footer.copyright': 'Alvaro Cortés Opazo',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',

    // Banner
    'banner.role': 'Full Stack Developer',

    // Bio
    'bio.p1': 'Full Stack Developer focused on building efficient and robust web experiences. I primarily work with React and JavaScript, integrating REST APIs, PGSQL databases, and modern deployment and automation workflows.',
    'bio.p2': 'Beyond development, I have experience applying artificial intelligence and RAG in real-world solutions, along with process automation using n8n and custom scripts. I stand out for my communication and leadership skills, acquired by working closely with end users and leading teams.',

    // Home page sections
    'home.trajectory': 'My Journey',
    'home.techStack': 'Tech Stack',
    'home.projects': 'Projects',

    // Timeline
    'timeline.work': 'Work',
    'timeline.studies': 'Studies',
    'timeline.errorLoad': 'Failed to load timeline',
    'timeline.empty': 'No timeline entries yet.',

    // Tech Stacks
    'tech.errorLoad': 'Failed to load tech stacks',
    'tech.empty': 'No tech categories yet.',

    // Projects
    'projects.errorLoad': 'Failed to load projects',
    'projects.empty': 'No projects yet.',
    'projects.live': 'Live',
    'projects.code': 'Code',

    // Project Modal
    'projectModal.about': 'About',
    'projectModal.techStack': 'Tech Stack',
    'projectModal.links': 'Links',
    'projectModal.viewLive': 'View Live',
    'projectModal.viewCode': 'View Code',

    // Blog
    'blog.title': 'Blog',
    'blog.search': 'Search',
    'blog.searchPlaceholder': 'Search posts...',
    'blog.tags': 'Tags',
    'blog.categories': 'Categories',

    // Blog categories
    'category.Development': 'Development',
    'category.Design': 'Design',
    'category.DevOps': 'DevOps',
    'category.AI': 'AI',
    'category.Career': 'Career',
    'category.Tutorial': 'Tutorial',
    'category.Other': 'Other',

    // Blog Listing
    'blogListing.errorLoad': 'Failed to load posts',
    'blogListing.errorRetry': 'Please try again later.',
    'blogListing.noResults': 'No posts found',
    'blogListing.noResultsHint': 'Try adjusting your filters.',

    // Post Detail
    'post.notFound': 'Post not found',
    'post.backToBlog': 'Back to blog',

    // Pagination
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    'pagination.page': 'Page {current} of {total}',

    // Share
    'share.label': 'Share:',

    // Footer
    'footer.copyright': 'Alvaro Cortés Opazo',
  },
} as const

export type TranslationKey = keyof typeof translations.es
export default translations
