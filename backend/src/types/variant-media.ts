import { 
  VariantMedia, 
} from "../models/variant-media"

export type ListVariantMediasRequest = {
  // no expected parameters
};

export type ListVariantMediasResponse = {
  variant_medias: VariantMedia[]
  count: number
};

export type GetVariantMediaRequest = {
  // no expected parameters
  variant_id: string
};

export type GetVariantMediaResponse = {
  variant_media: VariantMedia
};

export type CreateVariantMediaRequest = {
  variant_id: string
  file_key: string
  mime_type: string
};

export type CreateVariantMediaResponse = {
  variant_media: VariantMedia
};