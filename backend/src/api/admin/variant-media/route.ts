import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa"
import VariantMediaService 
  from "../../../services/variant-media"

export const GET = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const variantMediaService = req.scope.resolve<
    VariantMediaService
  >("variantMediaService")
  // omitting pagination for simplicity
  const [variantMedias, count] = await variantMediaService
    .listAndCount({}, {
      relations: ["variant"],
      // relations: [],
    }
  )

  res.json({
    variant_medias: variantMedias,
    count,
  })
}

export const POST = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  console.log("req body", req.body)
  // validation omitted for simplicity
  const {
    variant_id,
    file_key,
    mime_type,
  } = req.body as typeof variantMedia

  const variantMediaService = req.scope.resolve<
    VariantMediaService
  >("variantMediaService")
  const variantMedia = await variantMediaService.create({
    variant_id,
    file_key: file_key.replace(/[^a-zA-Z0-9]/g, '_'),
    mime_type,
  })

  res.json({
    variant_media: variantMedia,
  })
}