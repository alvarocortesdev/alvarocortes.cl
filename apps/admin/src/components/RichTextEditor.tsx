import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { uploadImage } from '../lib/storage'
import { ImageEditModal } from './ImageEditModal'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false)
  const [isLinkActive, setIsLinkActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Image edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-6',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-6',
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-400 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg my-4',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    onSelectionUpdate: ({ editor }) => {
      setIsLinkActive(editor.isActive('link'))
    },
    editorProps: {
      attributes: {
        class: `prose prose-invert max-w-none min-h-[300px] p-4 focus:outline-none
          [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-3
          [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2
          [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-400`,
      },
    },
  })

  // Update content when prop changes (e.g., loading existing post)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  // Toggle heading with mutual exclusion
  const toggleHeading = useCallback((level: 2 | 3) => {
    if (!editor) return

    if (editor.isActive('heading', { level })) {
      // Same heading active - remove it
      editor.chain().focus().setParagraph().run()
    } else {
      // Different or no heading - set this level
      editor.chain().focus().setHeading({ level }).run()
    }
  }, [editor])

  const addLink = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
      toast.success('Link added')
    }
  }, [editor])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }

    // Create object URL for preview in edit modal
    const objectUrl = URL.createObjectURL(file)
    setSelectedImageUrl(objectUrl)
    setEditModalOpen(true)

    // Clear input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImageEditCancel = () => {
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl)
    }
    setSelectedImageUrl(null)
    setEditModalOpen(false)
  }

  const handleImageEditConfirm = async (
    croppedImage: Blob,
    insertMode: 'embedded' | 'link'
  ) => {
    if (!editor) return

    // Clean up the object URL
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl)
    }
    setSelectedImageUrl(null)
    setEditModalOpen(false)

    // Convert blob to file for upload
    const file = new File([croppedImage], 'cropped-image.jpg', {
      type: 'image/jpeg',
    })

    setUploading(true)
    try {
      const result = await uploadImage(file)

      if (insertMode === 'embedded') {
        editor.chain().focus().setImage({ src: result.url }).run()
        toast.success('Image uploaded')
      } else {
        // Link mode - insert as text link
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${result.url}" target="_blank">${result.url}</a>`)
          .run()
        toast.success('Image link inserted')
      }
    } catch (error) {
      toast.error('Failed to upload image')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border border-neutral-700 rounded-lg overflow-hidden">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-neutral-800 border-b border-neutral-700">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Strikethrough"
        >
          <s>S</s>
        </ToolbarButton>

        <div className="w-px bg-neutral-600 mx-1" />

        <ToolbarButton
          onClick={() => toggleHeading(2)}
          active={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => toggleHeading(3)}
          active={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>

        <div className="w-px bg-neutral-600 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          •
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Numbered List"
        >
          1.
        </ToolbarButton>

        <div className="w-px bg-neutral-600 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Quote"
        >
          "
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title="Code Block"
        >
          {'</>'}
        </ToolbarButton>

        <div className="w-px bg-neutral-600 mx-1" />

        <ToolbarButton
          onClick={addLink}
          active={editor.isActive('link')}
          title="Add Link"
        >
          Link
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          active={false}
          title="Remove Link"
          disabled={!isLinkActive}
        >
          Unlink
        </ToolbarButton>

        <div className="w-px bg-neutral-600 mx-1" />

        <ToolbarButton
          onClick={() => fileInputRef.current?.click()}
          active={false}
          title="Upload Image"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Image'}
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <div className="bg-neutral-900">
        <EditorContent editor={editor} />
      </div>

      {/* Image Edit Modal */}
      {selectedImageUrl && (
        <ImageEditModal
          isOpen={editModalOpen}
          imageUrl={selectedImageUrl}
          onCancel={handleImageEditCancel}
          onConfirm={handleImageEditConfirm}
        />
      )}
    </div>
  )
}

interface ToolbarButtonProps {
  onClick: () => void
  active: boolean
  title: string
  children: React.ReactNode
  disabled?: boolean
}

function ToolbarButton({ onClick, active, title, children, disabled }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
        disabled
          ? 'opacity-50 cursor-not-allowed bg-neutral-700 text-neutral-400'
          : active
            ? 'bg-blue-600 text-white'
            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
      }`}
    >
      {children}
    </button>
  )
}
