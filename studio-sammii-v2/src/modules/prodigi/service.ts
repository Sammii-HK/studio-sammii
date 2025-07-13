import { MedusaService } from "@medusajs/framework/utils"
import { VariantMedia } from "./models/variant-media"

export default class ProdigiModuleService extends MedusaService({
  VariantMedia,
}) {
  async createMedia(data: {
    file_key: string
    mime_type: string
    variant_id: string
  }) {
    return await this.create(VariantMedia, data)
  }

  async getMedia(id: string) {
    return await this.retrieve(VariantMedia, id)
  }

  async listMedia(filters = {}) {
    return await this.list(VariantMedia, filters)
  }

  async updateMedia(id: string, data: Partial<{
    file_key: string
    mime_type: string
    variant_id: string
  }>) {
    return await this.update(VariantMedia, id, data)
  }

  async deleteMedia(id: string) {
    return await this.delete(VariantMedia, id)
  }

  async getMediaByVariantId(variantId: string) {
    const [media] = await this.list(VariantMedia, {
      variant_id: variantId,
    })
    return media.length > 0 ? media[0] : null
  }
} 