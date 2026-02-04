import { useState } from 'react'
import { uploadImage } from '../lib/storage'
import { toast } from 'react-toastify'

interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
  label?: string
  error?: string
}

// Curated subset of ~100 common development technology icons
const CURATED_ICONS = [
  'react', 'typescript', 'javascript', 'nodejs', 'python', 'java', 'csharp',
  'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'dart',
  'html5', 'css3', 'sass', 'tailwindcss', 'bootstrap',
  'nextdotjs', 'vite', 'webpack', 'rollup', 'esbuild',
  'express', 'nestjs', 'fastify', 'hono',
  'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite',
  'supabase', 'firebase', 'amazonaws', 'googlecloud', 'microsoftazure',
  'docker', 'kubernetes', 'nginx', 'apache',
  'git', 'github', 'gitlab', 'bitbucket',
  'vercel', 'netlify', 'heroku', 'railway',
  'graphql', 'apollographql', 'prisma', 'typeorm',
  'jest', 'vitest', 'playwright', 'cypress',
  'storybook', 'figma', 'adobephotoshop', 'adobeillustrator',
  'visualstudiocode', 'intellijidea', 'vim', 'neovim',
  'linux', 'ubuntu', 'debian', 'archlinux', 'macos', 'windows',
  'npm', 'yarn', 'pnpm', 'bun',
  'eslint', 'prettier', 'babel',
  'redux', 'mobx', 'vuedotjs', 'angular', 'svelte',
  'socketdotio', 'strapi', 'contentful', 'sanity',
  'cloudinary', 'stripe', 'twilio', 'sendgrid',
  'sentry', 'datadog', 'newrelic',
  'jira', 'confluence', 'notion', 'slack', 'discord',
  'chrome', 'firefox', 'safari', 'edge',
]

export function IconPicker({ value, onChange, label, error }: IconPickerProps) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  const filtered = CURATED_ICONS.filter(icon =>
    icon.toLowerCase().includes(search.toLowerCase())
  )

  const isCustomUrl = value && value.startsWith('http')

  const handleSelect = (icon: string) => {
    onChange(icon)
    setIsOpen(false)
    setSearch('')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.includes('svg')) {
      toast.error('Please upload an SVG file')
      return
    }

    setUploading(true)
    try {
      const result = await uploadImage(file)
      onChange(result.url)
      setIsOpen(false)
      toast.success('Custom icon uploaded')
    } catch (err) {
      toast.error('Failed to upload icon')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-300">
          {label}
        </label>
      )}

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className={`w-full bg-neutral-800 border ${
              error ? 'border-red-500' : 'border-neutral-700'
            } rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
          />
        </div>

        {value && (
          <div className="w-10 h-10 border border-neutral-700 rounded p-1.5 flex items-center justify-center bg-white">
            {isCustomUrl ? (
              <img src={value} alt="custom icon" className="w-full h-full object-contain" />
            ) : (
              <img
                src={`https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/${value}.svg`}
                alt={value}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="text-xs text-red-400">{error}</div>
      )}

      {isOpen && (
        <div className="border border-neutral-700 rounded bg-neutral-800 overflow-hidden">
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-3 text-neutral-500 text-sm">No icons found</div>
            ) : (
              filtered.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => handleSelect(icon)}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-700 flex items-center gap-3 transition-colors"
                >
                  <div className="w-5 h-5 bg-white rounded p-0.5 flex-shrink-0">
                    <img
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/${icon}.svg`}
                      alt={icon}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm text-white">{icon}</span>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-neutral-700 p-3 bg-neutral-900">
            <label className="block">
              <span className="text-xs text-neutral-400 mb-2 block">
                Upload custom SVG icon
              </span>
              <input
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleFileUpload}
                disabled={uploading}
                className="text-xs text-neutral-300 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {uploading && (
                <span className="text-xs text-neutral-500 ml-2">Uploading...</span>
              )}
            </label>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-blue-400 hover:text-blue-300"
      >
        {isOpen ? 'Hide' : 'Show'} icon picker
      </button>
    </div>
  )
}
