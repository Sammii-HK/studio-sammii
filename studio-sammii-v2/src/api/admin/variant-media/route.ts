import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const { variant_id, file_key, mime_type } = req.body as {
      variant_id: string
      file_key: string
      mime_type: string
    }

    if (!variant_id || !file_key || !mime_type) {
      return res.status(400).json({
        error: "Missing required fields: variant_id, file_key, mime_type"
      })
    }

    // In a real implementation, you would save this to your database
    // For now, we'll just return the data
    const variantMedia = {
      id: `vm_${Date.now()}`,
      variant_id,
      file_key: file_key.replace(/[^a-zA-Z0-9]/g, '_'),
      mime_type,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    res.json({
      variant_media: variantMedia,
    })
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to create variant media",
      details: error.message,
    })
  }
} 