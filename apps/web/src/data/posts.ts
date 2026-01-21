export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string  // Full HTML/markdown content
  date: string
  author: string
  tags: string[]
  category: string
}

export const posts: BlogPost[] = [
  {
    slug: 'getting-started-with-react-19',
    title: 'Getting Started with React 19',
    excerpt: 'Explore the new features in React 19 including improved server components and enhanced concurrent rendering.',
    content: `
      <p>React 19 brings exciting new features that make building modern web applications even more powerful and efficient.</p>

      <h2>Server Components</h2>
      <p>One of the most significant additions is the improved support for Server Components. These allow you to render components on the server, reducing the JavaScript bundle sent to the client.</p>

      <h2>Enhanced Concurrent Rendering</h2>
      <p>React 19 improves upon the concurrent features introduced in React 18. The new automatic batching system is smarter and handles more edge cases seamlessly.</p>

      <h2>New Hooks</h2>
      <p>Several new hooks have been added to simplify common patterns:</p>
      <ul>
        <li><code>useFormStatus</code> for form state management</li>
        <li><code>useOptimistic</code> for optimistic updates</li>
        <li>Improved <code>use</code> hook for promises and context</li>
      </ul>

      <h2>Getting Started</h2>
      <p>To upgrade to React 19, update your package.json dependencies and run your package manager's install command. Most applications will work without changes, but review the migration guide for any breaking changes that might affect your codebase.</p>
    `,
    date: '2026-01-18',
    author: 'Alvaro Cortes',
    tags: ['React', 'Frontend'],
    category: 'Development'
  },
  {
    slug: 'tailwind-v4-whats-new',
    title: "Tailwind v4: What's New",
    excerpt: 'A deep dive into Tailwind CSS v4 with its new @import syntax and improved performance.',
    content: '<p>Tailwind v4 introduces major improvements including the new @import syntax and better performance.</p>',
    date: '2026-01-12',
    author: 'Alvaro Cortes',
    tags: ['Tailwind', 'CSS'],
    category: 'Design'
  },
  {
    slug: 'typescript-best-practices-2026',
    title: 'TypeScript Best Practices 2026',
    excerpt: 'Essential TypeScript patterns and practices for writing maintainable code.',
    content: '<p>TypeScript continues to evolve. Here are the best practices for 2026.</p>',
    date: '2026-01-05',
    author: 'Alvaro Cortes',
    tags: ['TypeScript', 'Backend'],
    category: 'Development'
  },
  {
    slug: 'building-with-vite',
    title: 'Building with Vite',
    excerpt: 'Why Vite is the go-to build tool for modern web development projects.',
    content: '<p>Vite has become the standard for modern web development. Learn why.</p>',
    date: '2025-12-25',
    author: 'Alvaro Cortes',
    tags: ['Vite', 'DevOps'],
    category: 'Tutorials'
  },
  {
    slug: 'career-tips-for-developers',
    title: 'Career Tips for Developers',
    excerpt: 'Practical advice for growing your software development career in 2026.',
    content: '<p>Growing your career as a developer requires continuous learning and networking.</p>',
    date: '2025-12-18',
    author: 'Alvaro Cortes',
    tags: ['Career', 'Tips'],
    category: 'Career'
  }
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug)
}
