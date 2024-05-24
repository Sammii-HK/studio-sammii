import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa"
import VariantMediaService from "../../../../services/variant-media"

export const GET = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const variantMediaService = req.scope.resolve<
    VariantMediaService
  >("variantMediaService")
  // console.log("req.params", req.params);

  const variantMedia = await variantMediaService
    .retrieveMediaByVariantId(req.params.id)
  
  res.json({
    variant_media: variantMedia,
  })
}

// export const POST = async (
//   req: MedusaRequest, 
//   res: MedusaResponse
// ) => {
//   console.log("req body", req.body)
//   // validation omitted for simplicity
//   const {
//     variant_id,
//     file_key,
//     mime_type,
//   } = req.body as typeof variantMedia

//   const variantMediaService = req.scope.resolve<
//     VariantMediaService
//   >("variantMediaService")
//   const variantMedia = await variantMediaService.create({
//     variant_id,
//     file_key,
//     mime_type,
//   })

//   res.json({
//     variant_media: variantMedia,
//   })
// }