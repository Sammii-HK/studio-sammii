import { ProductVariant } from "@medusajs/medusa/dist/models/product-variant";
import { 
  VariantMedia,
} from "../models/variant-media"

export type VariantMediaWithUrl = {
  id: string,
  file_key: string,
  mime_type: string,
  variant_id?: string,
  variant?: ProductVariant,
  src?: string,
  created_at: Date,
  updated_at: Date,
}

export type ListVariantMediasRequest = {
  // no expected parameters
};

export type ListVariantMediasResponse = {
  variant_medias: VariantMediaWithUrl[]
  count: number
};

export type GetVariantMediaRequest = {
  // no expected parameters
  variant_id: string
};

export type GetVariantMediaResponse = {
  variant_media: VariantMediaWithUrl
};

export type CreateVariantMediaRequest = {
  variant_id: string
  file_key: string
  mime_type: string
};

export type CreateVariantMediaResponse = {
  variant_media: VariantMedia
};