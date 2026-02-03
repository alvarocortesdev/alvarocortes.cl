import { useState } from 'react'
import { motion } from 'framer-motion'
import { PostCard } from './PostCard'
import { Pagination } from './Pagination'
import { usePosts } from '../hooks/usePosts'

const POSTS_PER_PAGE = 4

export function BlogListing() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: posts = [], isLoading, error } = usePosts()

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="space-y-6"
      >
        {[...Array(POSTS_PER_PAGE)].map((_, i) => (
          <div key={i} className="h-32 bg-neutral-800/50 rounded-lg animate-pulse" />
        ))}
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="text-red-400 p-6 rounded-lg bg-red-900/20 border border-red-800"
      >
        <p className="font-medium mb-2">Failed to load posts</p>
        <p className="text-sm text-red-300">Please try again later.</p>
      </motion.div>
    )
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="text-neutral-400 text-center py-12 bg-neutral-800/30 rounded-lg"
      >
        <p className="text-lg mb-2">No posts published yet</p>
        <p className="text-sm">Check back soon for new content.</p>
      </motion.div>
    )
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="space-y-6"
      >
        {currentPosts.map(post => (
          <PostCard key={post.slug} {...post} />
        ))}
      </motion.div>

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
