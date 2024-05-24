import { 
  FindConfig,
  ProductVariant,
  ProductVariantService,
  Selector,
  TransactionBaseService,
  buildQuery,
} from "@medusajs/medusa"
import { VariantMedia } from "../models/variant-media"
import { MedusaError } from "@medusajs/utils"

type InjectedDependencies = {
  productVariantService: ProductVariantService
}

class VariantMediaService extends TransactionBaseService {
  protected productVariantService_: ProductVariantService

  constructor(container: InjectedDependencies) {
    super(container)
    this.productVariantService_ = 
      container.productVariantService
  }

  private checkVariantInRelations(
    relations: string[]
  ): [string[], boolean] {
    const variantsRelationIndex = relations.indexOf("variant")
    const isVariantsEnabled = variantsRelationIndex !== -1
    if (isVariantsEnabled) {
      relations.splice(variantsRelationIndex, 1)
    }

    return [relations, isVariantsEnabled]
  }

  async listAndCount(
    selector?: Selector<VariantMedia>,
    config: FindConfig<VariantMedia> = {
      skip: 0,
      take: 20,
      relations: [],
    }
  ): Promise<[VariantMedia[], number]> {
    const variantMediaRepo = this.activeManager_.getRepository(
      VariantMedia
    )

    const [
      relations,
      isVariantsEnabled,
    ] = this.checkVariantInRelations(
      config.relations || []
    )

    config.relations = relations

    const query = buildQuery(selector, config)

    const [
      variantMedias,
      count,
    ] = await variantMediaRepo.findAndCount(query)

    if (isVariantsEnabled) {
      // retrieve product variants
      await Promise.all(variantMedias.map(
        async (media, index) => {
          variantMedias[index].variant = 
            await this.retrieveVariantByMedia(media)
        }))
    }

    return [variantMedias, count]
  }
  
  async list(
    selector?: Selector<VariantMedia>,
    config: FindConfig<VariantMedia> = {
      skip: 0,
      take: 20,
      relations: [],
    }
  ): Promise<VariantMedia[]> {
    const [variantMedias] = await this.listAndCount(
        selector, config
      )

    return variantMedias
  }

  async retrieve(
    id: string,
    // config?: FindConfig<VariantMedia>
    config: FindConfig<VariantMedia> = {
      skip: 0,
      take: 20,
      relations: [],
    }
  ): Promise<VariantMedia> {
    const variantMediaRepo = this.activeManager_.getRepository(
      VariantMedia
    )

    const query = buildQuery({
      id,
    }, config)

    const productMedia = await variantMediaRepo.findOne(query)

    if (!productMedia) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "VariantMedia was not found"
      )
    }

    if (config.relations.includes("variant")) {
      productMedia.variant = await this.retrieveVariantByMedia(
        productMedia
      )
    }

    return productMedia
  }

  async retrieveVariantByMedia(productMedia: VariantMedia) {
    return await this.productVariantService_.retrieve(
      productMedia.variant_id,
      {
        relations: ["product"],
      }
    )
  }

  async retrieveMediasByVariant(
    productVariant: ProductVariant
  ): Promise<VariantMedia[]> {
    const variantMediaRepo = this.activeManager_.getRepository(
      VariantMedia
    )

    const query = buildQuery({
      variant_id: productVariant.id,
    })

    const variantMedias = await variantMediaRepo.find(query)

    return variantMedias
  }

  async retrieveMediasByVariantId(
    variantId: string
  ): Promise<VariantMedia[]> {
    const variantMediaRepo = this.activeManager_.getRepository(
      VariantMedia
    )

    const query = buildQuery({
      variant_id: variantId,
    })

    const variantMedias = await variantMediaRepo.find(query)

    return variantMedias
  }

  async retrieveMediaByVariantId(
    variantId: string
  ): Promise<VariantMedia> {
    const variantMediaRepo = this.activeManager_.getRepository(
      VariantMedia
    )

    const query = buildQuery({
      variant_id: variantId,
    })

    const variantMedias = await variantMediaRepo.findOne(query)

    return variantMedias
  }

  async create(
    data: Pick<
      VariantMedia, 
      "file_key" | "variant_id" | "mime_type"
    >
  ): Promise<VariantMedia> {
    return this.atomicPhase_(async (manager) => {
      const variantMediaRepo = manager.getRepository(
        VariantMedia
      )
      const productMedia = variantMediaRepo.create(data)
      const result = await variantMediaRepo.save(productMedia)

      return result
    })
  }

  async update(
    id: string,
    data: Omit<Partial<VariantMedia>, "id">
  ): Promise<VariantMedia> {
    return await this.atomicPhase_(async (manager) => {
      const variantMediaRepo = manager.getRepository(
        VariantMedia
      )
      const productMedia = await this.retrieve(id)

      Object.assign(productMedia, data)

      return await variantMediaRepo.save(productMedia)
    })
  }

  async delete(id: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const variantMediaRepo = manager.getRepository(
        VariantMedia
      )
      const productMedia = await this.retrieve(id)
      
      await variantMediaRepo.remove([productMedia])
    })
  }
}

export default VariantMediaService