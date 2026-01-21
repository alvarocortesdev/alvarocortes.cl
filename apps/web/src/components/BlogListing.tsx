import { useState } from 'react'
import { PostCard } from './PostCard'
import { Pagination } from './Pagination'
import { posts } from '../data/posts'

const POSTS_PER_PAGE = 4

export function BlogListing() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

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
