import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'

interface ThumbnailCropModalProps {
  isOpen: boolean
  imageUrl: string
  onCancel: () => void
  onConfirm: (croppedImage: Blob) => void
}

const ASPECT_RATIO = 16 / 9

export function ThumbnailCropModal({
  isOpen,
  imageUrl,
  onCancel,
  onConfirm,
}: ThumbnailCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

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
      onConfirm(croppedBlob)
    } catch (error) {
      console.error('Failed to crop image:', error)
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
          <div>
            <h3 className="text-lg font-semibold text-white">Crop Thumbnail</h3>
            <p className="text-sm text-neutral-400">
              Aspect ratio locked to 16:9
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-neutral-400 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Cropper */}
        <div className="relative h-80 bg-neutral-900">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={ASPECT_RATIO}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="px-6 py-4 border-t border-neutral-700">
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

        {/* Actions */}
        <div className="flex justify-end gap-2 px-6 py-4 bg-neutral-900/50">
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
            {processing ? 'Processing...' : 'Crop & Use'}
          </button>
        </div>
      </div>
    </div>
  )
}
