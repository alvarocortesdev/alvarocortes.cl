import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Tables } from '@alvarocortes/shared'

type Post = Tables<'posts'>

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      // Fetch ALL posts (admin sees drafts too)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-400 hover:text-white">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
          </div>
          <Link
            to="/posts/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            New Post
          </Link>
        </div>
      </header>

      <main className="p-6">
        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-neutral-400">No posts yet. Create your first post!</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-neutral-400 border-b border-neutral-800">
                <th className="pb-3">Title</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Created</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-neutral-800">
                  <td className="py-4 text-white">{post.title}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        post.status === 'published'
                          ? 'bg-green-900 text-green-300'
                          : post.status === 'draft'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 text-neutral-400">{post.category}</td>
                  <td className="py-4 text-neutral-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <Link
                      to={`/posts/${post.id}/edit`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  )
}
