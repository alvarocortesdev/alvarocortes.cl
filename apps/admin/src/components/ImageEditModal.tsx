import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'

interface ImageEditModalProps {
  isOpen: boolean
  imageUrl: string
  onCancel: () => void
  onConfirm: (croppedImage: Blob, insertMode: 'embedded' | 'link') => void
}

type AspectRatio = '1:1' | '16:9' | '4:3' | 'free'

const ASPECT_RATIOS: { label: string; value: AspectRatio; ratio?: number }[] = [
  { label: 'Free', value: 'free', ratio: undefined },
  { label: '1:1', value: '1:1', ratio: 1 },
  { label: '16:9', value: '16:9', ratio: 16 / 9 },
  { label: '4:3', value: '4:3', ratio: 4 / 3 },
]

export function ImageEditModal({
  isOpen,
  imageUrl,
  onCancel,
  onConfirm,
}: ImageEditModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('free')
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [insertMode, setInsertMode] = useState<'embedded' | 'link'>('embedded')
  const [processing, setProcessing] = useState(false)

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const getCurrentAspect = () => {
    const found = ASPECT_RATIOS.find((a) => a.value === aspectRatio)
    return found?.ratio
  }

  const createCroppedImage = async (): Promise<Blob> => {
    const image = new Image()
    image.src = imageUrl
    await new Promise((resolve) => {
      image.onload = resolve
    })

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx || !croppedAreaPixels) {
      throw new Error('Could not create cropped image')
    }

    canvas.width = croppedAreaPixels.width
    canvas.height = croppedAreaPixels.height

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to create blob'))
          }
        },
        'image/jpeg',
        0.9
      )
    })
  }

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return

    setProcessing(true)
    try {
      const croppedBlob = await createCroppedImage()
      onConfirm(croppedBlob, insertMode)
    } catch (error) {
      console.error('Failed to crop image:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleSkipCrop = async () => {
    setProcessing(true)
    try {
      // Convert original image URL to blob
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      onConfirm(blob, insertMode)
    } catch (error) {
      console.error('Failed to process image:', error)
    } finally {
      setProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-700">
          <h3 className="text-lg font-semibold text-white">Edit Image</h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-neutral-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Cropper */}
        <div className="relative h-80 bg-neutral-900">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={getCurrentAspect()}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="px-6 py-4 space-y-4 border-t border-neutral-700">
          {/* Zoom slider */}
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Zoom</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Aspect ratio buttons */}
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Aspect Ratio</label>
            <div className="flex gap-2">
              {ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar.value}
                  type="button"
                  onClick={() => setAspectRatio(ar.value)}
                  className={`px-3 py-1 rounded text-sm ${
                    aspectRatio === ar.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          {/* Insert mode */}
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Insert as</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setInsertMode('embedded')}
                className={`px-3 py-1 rounded text-sm ${
                  insertMode === 'embedded'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                Embedded Image
              </button>
              <button
                type="button"
                onClick={() => setInsertMode('link')}
                className={`px-3 py-1 rounded text-sm ${
                  insertMode === 'link'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                Link Only
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {insertMode === 'embedded'
                ? 'Image will be displayed inline in the post'
                : 'Only the URL will be copied (image not shown)'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between px-6 py-4 bg-neutral-900/50">
          <button
            type="button"
            onClick={handleSkipCrop}
            disabled={processing}
            className="px-4 py-2 text-sm text-neutral-400 hover:text-white disabled:opacity-50"
          >
            Skip Crop
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={processing}
              className="px-4 py-2 text-sm bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={processing}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Insert Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
