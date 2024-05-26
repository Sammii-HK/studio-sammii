import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa"
import ProductMediaService 
  from "../../../services/product-media"
import { MediaType } from "../../../models/product-media"

export const GET = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const productMediaService = req.scope.resolve<
    ProductMediaService
  >("productMediaService")
  // omitting pagination for simplicity
  const [productMedias, count] = await productMediaService
    .listAndCount({
      type: MediaType.MAIN,
    }, {
      relations: ["variant"],
    }
  )

  res.json({
    product_medias: productMedias,
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
    type = MediaType.MAIN,
    name,
    mime_type,
  } = req.body as typeof productMedia

  const productMediaService = req.scope.resolve<
    ProductMediaService
  >("productMediaService")
  const productMedia = await productMediaService.create({
    variant_id,
    file_key,
    type,
    name,
    mime_type,
  })

  res.json({
    product_media: productMedia,
  })
}