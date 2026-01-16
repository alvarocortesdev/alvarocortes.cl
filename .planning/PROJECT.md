# Alvaro Cortes Portfolio

## What This Is

Portfolio personal profesional para Alvaro Cortes. Un sitio web completo con blog, showcase de proyectos, y sistema de temas administrable. Diseñado para impresionar reclutadores demostrando habilidades de frontend y desarrollo fullstack. Inspirado visualmente en adhamdannaway.com.

## Core Value

El sitio debe sentirse fluido, profesional y demostrar dominio técnico — cada interacción, animación y detalle visual refleja capacidad de desarrollo frontend de alto nivel.

## Requirements

### Validated

(None yet — ship to validate)

### Active

**Infraestructura & Stack:**
- [ ] Monorepo BHVR (Bun, Hono, Vite, React)
- [ ] Supabase con PostgreSQL para BD
- [ ] Supabase Auth con GitHub OAuth
- [ ] Vitest para testing
- [ ] Vercel para hosting
- [ ] GitHub CI/CD hacia Vercel
- [ ] Admin en subdominio separado (admin.dominio.com)

**Responsive Design:**
- [ ] Desktop optimizado
- [ ] Mobile optimizado
- [ ] Tablet optimizado
- [ ] Folded Phones optimizado
- [ ] TV optimizado

**Carga Progresiva:**
- [ ] Header carga primero (rápido)
- [ ] Contenido aparece con transición de opacidad cuando está listo
- [ ] Footer se muestra después del contenido
- [ ] Sensación fluida, sin saltos visuales

**Internacionalización:**
- [ ] UI completa en ES/EN
- [ ] Contenido (blog, portfolio) en ambos idiomas
- [ ] Switcher de idioma en header

**Componentes Fijos (todas las páginas):**

*Header:*
- [ ] Logo/foto + nombre a la izquierda
- [ ] Navegación derecha: Inicio, Portafolio, Blog
- [ ] Switcher idioma (ES/EN)
- [ ] Toggle tema light/dark

*3 Íconos Flotantes (izquierda, centrados verticalmente):*
- [ ] Contáctame: Modal con formulario (Nombre, Teléfono, Correo, Mensaje) → envía email directo via Resend/SendGrid
- [ ] Información: Modal con links + redes sociales (LinkedIn, GitHub, Twitter/X, Instagram) + sección herramientas/recursos dev
- [ ] Temas: Selector de temas (hasta 5 administrables, cada uno con variante light/dark)
- [ ] Hover despliega leyenda desde detrás del ícono hacia la derecha

*Footer:*
- [ ] Oculto por defecto
- [ ] Se despliega al llegar al final del scroll
- [ ] Borde superior sticky al subir (como barra de estado de navegador)

**Página: Inicio (Home):**
- [ ] Banner con foto, nombre, perfil de trabajo, imagen relacionada
- [ ] Sección de presentación/bio personal

**Página: Portafolio:**
- [ ] Timeline horizontal de experiencia laboral (líneas verticales arriba/abajo con hitos)
- [ ] Sección de stacks tecnológicos (4 cuadros: frontend, backend, herramientas, adicionales) con íconos + nombres
- [ ] Bento Grid de proyectos web
- [ ] Hover en proyecto: se levanta y agranda invitando click
- [ ] Click abre modal con vista previa + íconos URL y GitHub

**Página: Blog:**
- [ ] Estilo réplica de Blogger
- [ ] Sidebar izquierda fija: búsqueda, calendario de entradas, tags
- [ ] Sidebar colapsable en móvil (barra desplegable arriba)
- [ ] Área principal con entradas (máx 4 por vista)

**Panel Admin (subdominio):**
- [ ] GitHub OAuth login
- [ ] CRUD de posts del blog (ES/EN)
- [ ] CRUD de proyectos del portfolio (ES/EN)
- [ ] CRUD de temas (hasta 5, cada uno con light/dark)

### Out of Scope

- Múltiples usuarios admin — solo el owner
- Comentarios en blog — no necesarios por ahora
- E-commerce/pagos — es portfolio, no tienda
- Analytics avanzados — Vercel Analytics básico es suficiente

## Context

**Referencia visual:** https://www.adhamdannaway.com/ — especialmente la fluidez de carga y las transiciones suaves.

**Propósito:** Sitio para atraer reclutadores y mostrar capacidades técnicas. El código debe ser tan impresionante como el resultado visual — reclutadores pueden ver los repos de GitHub.

**Redes sociales a incluir:**
- LinkedIn
- GitHub
- Twitter/X
- Instagram
- Sección de herramientas/recursos útiles para devs

**Tipografía:** Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif (en orden de fallback)

## Constraints

- **Stack**: BHVR (Bun, Hono, Vite, React) — no negociable
- **BD**: Supabase con PostgreSQL — ya decidido
- **Hosting**: Vercel — integración con GitHub CI/CD
- **Testing**: Vitest — consistente con el ecosistema
- **Arquitectura**: Monorepo — sitio público + admin en mismo repo
- **Email**: Resend o SendGrid para formulario de contacto

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Monorepo para sitio + admin | Código compartido, deploy unificado | — Pending |
| Admin en subdominio | Separación clara público/privado, sin UI de login en sitio | — Pending |
| GitHub OAuth único | Solo un admin (owner), simple y seguro | — Pending |
| Temas administrables (hasta 5) | Demostrar habilidades frontend a reclutadores | — Pending |
| i18n completo (ES/EN) | Alcance internacional, mostrar capacidad de internacionalización | — Pending |
| Carga progresiva con transiciones | UX fluida, diferenciador visual | — Pending |

---
*Last updated: 2026-01-16 after initialization*
