import { useEffect, useRef } from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: 'danger' | 'primary' | 'warning'
  onConfirm: () => void
  onCancel: () => void
  children?: React.ReactNode
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
  children,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onCancel])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  if (!isOpen) return null

  const variantClasses = {
    danger: 'bg-red-600 hover:bg-red-700',
    primary: 'bg-blue-600 hover:bg-blue-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-neutral-800 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-neutral-400">{message}</p>
          {children}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-neutral-900/50">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${variantClasses[confirmVariant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

// Multi-action modal for Cancel confirmation
interface MultiActionModalProps {
  isOpen: boolean
  title: string
  message: string
  actions: {
    label: string
    variant: 'danger' | 'primary' | 'secondary'
    onClick: () => void
  }[]
  onClose: () => void
}

export function MultiActionModal({
  isOpen,
  title,
  message,
  actions,
  onClose,
}: MultiActionModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const variantClasses = {
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-neutral-800 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-neutral-400">{message}</p>
        </div>

        <div className="flex flex-col gap-2 px-6 py-4 bg-neutral-900/50">
          {actions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={action.onClick}
              className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${variantClasses[action.variant]}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
