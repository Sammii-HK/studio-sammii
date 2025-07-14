import { model } from "@medusajs/framework/utils"

export const VariantMedia = model.define("variant_media", {
  id: model.id(),
  file_key: model.text(),
  mime_type: model.text(),
  variant_id: model.text(),
  created_at: model.dateTime(),
  updated_at: model.dateTime(),
}) 