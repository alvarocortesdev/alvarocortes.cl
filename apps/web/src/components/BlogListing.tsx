import { useState } from 'react'
import { PostCard } from './PostCard'
import { Pagination } from './Pagination'

// Sample posts data (will be from CMS in future)
const samplePosts = [
  {
    slug: 'getting-started-with-react-19',
    title: 'Getting Started with React 19',
    excerpt: 'Explore the new features in React 19 including improved server components and enhanced concurrent rendering.',
    date: '2026-01-18',
    tags: ['React', 'Frontend'],
    category: 'Development'
  },
  {
    slug: 'tailwind-v4-whats-new',
    title: "Tailwind v4: What's New",
    excerpt: 'A deep dive into Tailwind CSS v4 with its new @import syntax and improved performance.',
    date: '2026-01-12',
    tags: ['Tailwind', 'CSS'],
    category: 'Design'
  },
  {
    slug: 'typescript-best-practices-2026',
    title: 'TypeScript Best Practices 2026',
    excerpt: 'Essential TypeScript patterns and practices for writing maintainable code.',
    date: '2026-01-05',
    tags: ['TypeScript', 'Backend'],
    category: 'Development'
  },
  {
    slug: 'building-with-vite',
    title: 'Building with Vite',
    excerpt: 'Why Vite is the go-to build tool for modern web development projects.',
    date: '2025-12-25',
    tags: ['Vite', 'DevOps'],
    category: 'Tutorials'
  },
  {
    slug: 'career-tips-for-developers',
    title: 'Career Tips for Developers',
    excerpt: 'Practical advice for growing your software development career in 2026.',
    date: '2025-12-18',
    tags: ['Career', 'Tips'],
    category: 'Career'
  }
]

const POSTS_PER_PAGE = 4

export function BlogListing() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(samplePosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = samplePosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div>
      <div className="space-y-6">
        {currentPosts.map(post => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}
