import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://alvarocortes.cl',
  'https://admin.alvarocortes.cl',
]

const app = new Hono()
  .use(
    '*',
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  )
  .get('/', (c) => {
    return c.json({
      message: 'Alvaro Cortes API',
      version: '0.0.1',
      status: 'ok',
    })
  })
  .get('/health', (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() })
  })
  .post('/images/upload', async (c) => {
    try {
      const body = await c.req.json()
      const { data, filename } = body as { data: string; filename?: string }

      if (!data) {
        return c.json({ error: 'No image data provided' }, 400)
      }

      // Generate unique public_id
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(7)
      const baseName = filename?.split('.')[0] || 'image'
      const publicId = `alvarocortes/blog/${timestamp}-${randomStr}-${baseName}`

      const result = await cloudinary.uploader.upload(data, {
        public_id: publicId,
        resource_type: 'image',
        overwrite: false,
      })

      return c.json({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      })
    } catch (error) {
      console.error('Upload error:', error)
      return c.json({ error: 'Failed to upload image' }, 500)
    }
  })
  .delete('/images/:publicId{.+}', async (c) => {
    try {
      const publicId = c.req.param('publicId')

      if (!publicId) {
        return c.json({ error: 'No public ID provided' }, 400)
      }

      const result = await cloudinary.uploader.destroy(publicId)

      if (result.result === 'ok') {
        return c.json({ success: true })
      } else {
        return c.json({ error: 'Image not found or already deleted' }, 404)
      }
    } catch (error) {
      console.error('Delete error:', error)
      return c.json({ error: 'Failed to delete image' }, 500)
    }
  })

export default app
