const API_URL = import.meta.env.VITE_API_URL || 'https://api.alvarocortes.cl'

interface UploadResult {
  url: string
  publicId: string
  width: number
  height: number
}

export async function uploadImage(file: File): Promise<UploadResult> {
  // Convert file to base64 data URL
  const base64 = await fileToBase64(file)

  const response = await fetch(`${API_URL}/images/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: base64,
      filename: file.name,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to upload image')
  }

  return response.json()
}

export async function deleteImage(publicId: string): Promise<void> {
  const response = await fetch(`${API_URL}/images/${encodeURIComponent(publicId)}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to delete image')
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
