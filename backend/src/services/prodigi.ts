import { AbstractFileService, AbstractFulfillmentService, Cart, Fulfillment, LineItem, Order } from "@medusajs/medusa"
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";
import { ProdigiOrder, createOrder } from "./fulfilmentServices/prodigi/create-order";
import VariantMediaService from "./variant-media";
// import { getProductDetails } from "../utils/prodigi/getProductDetails";

type ProdigiFulfillment = Fulfillment & {
  metadata: {
    prodigiOrderId: string
  }
}

class ProdigiService extends AbstractFulfillmentService {
  static identifier = "prodigi"
  private variantMediaService: VariantMediaService
  private fileService: AbstractFileService

  constructor(container, options) {
    super(container)
    this.variantMediaService = container.variantMediaService
    this.fileService = container.fileService
  }

  async getFulfillmentOptions(): Promise<any[]> {
    return [
      {
        id: "prodigi-standard",
      },
      // {
      //   id: "prodigi-first-class",
      // },
    ]
  }

  async createFulfillment(
    data: ProdigiOrder,
    items: LineItem[],
    order: Order,
    fulfillment: Fulfillment
  ) {
    // console.log("🍉 createFulfillment data", data);
    // console.log("order", order);
    return createOrder(data)
  }

  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: Cart
  ): Promise<Record<string, unknown>> {    
    if (optionData.id !== "prodigi-standard" && optionData.id !== "prodigi-first-class") {
      throw new Error("invalid data")
    }

    const PRODIGI = 'PDGI';

    const PRODIGI_SKUS = {
      CARD_SINGLE: 'CLASSIC-INV-GLOS-6X6',
      CARD_TEN: 'CLASSIC-INV-GLOS-6X6-10',
      POSTER_A4: 'GLOBAL-BLP-A4',
      POSTER_A3: 'GLOBAL-BLP-A3',
    }

    const getFulfilmentSku = (item: LineItem) => {
      const splitSku = item.variant.sku.split(PRODIGI + '-')
      const extractedSku = splitSku[splitSku.length -1]

      return Object.values(PRODIGI_SKUS).includes(extractedSku) ? extractedSku : null;
    };

    const getVariantMediaUrl = async (variantId: string) => {
      const variantMedia = await this.variantMediaService.retrieveMediaByVariantId(variantId);
      const url = await this.fileService.getPresignedDownloadUrl({
        fileKey: variantMedia.file_key,
        isPrivate: true
      });

      return url;
    };

    const handleAssets = async (item: LineItem) => {
      const assetUrl = await getVariantMediaUrl(item.variant_id);
      return [
        {
          "printArea": "default",
          "url": assetUrl,
        }
      ]
    }

    return {
      "shippingMethod": "Budget",
      "recipient": {
          "address": {
              "line1": cart.shipping_address.address_1,
              "line2": cart.shipping_address.address_2 || undefined,
              "postalOrZipCode": cart.shipping_address.postal_code,
              "countryCode": cart.shipping_address.country_code,
              "townOrCity": cart.shipping_address.city,
              "stateOrCounty": cart.shipping_address.province
          },
          "name": `${cart.shipping_address.first_name} ${cart.shipping_address.last_name}`,
          "email": cart.email
      },
      "items": await Promise.all(cart.items.map(async (item) =>  ({
          sku: getFulfilmentSku(item),
          copies: item.quantity,
          sizing: 'fillPrintArea',
          assets: await handleAssets(item)
        }))
      ),
    }
  }

  async validateOption(
    data: Record<string, unknown>
  ): Promise<boolean> {
    return data.id === "prodigi-standard" || data.id === "prodigi-first-class"
  }

  async canCalculate(
    data: Record<string, unknown>
  ): Promise<boolean> {
    return false; // TODO: implement logic to support non-flat-rate shipping cost if needed
  }

  async calculatePrice(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: Cart
  ): Promise<number> {
    return cart.items.length * 1000
  }

  async cancelFulfillment(
    fulfillment: Record<string, unknown>
  ): Promise<any> {
    return {}
  }

  async createReturn(
    returnOrder: CreateReturnType
  ): Promise<Record<string, unknown>> {
    return {}
  }

  async getFulfillmentDocuments(
    data: Record<string, unknown>
  ): Promise<any> {
    // assuming you contact a client to
    // retrieve the document
    // return this.client.getFulfillmentDocuments()
  }

  async getReturnDocuments(
    data: Record<string, unknown>
  ): Promise<any> {
    // assuming you contact a client to
    // retrieve the document
    // return this.client.getReturnDocuments()
  }

  async getShipmentDocuments(
    data: Record<string, unknown>
  ): Promise<any> {
    // assuming you contact a client to
    // retrieve the document
    // return this.client.getShipmentDocuments()
  }

  async retrieveDocuments(
    fulfillmentData: Record<string, unknown>,
    documentType: "invoice" | "label"
  ): Promise<any> {
    // assuming you contact a client to
    // retrieve the document
    // return this.client.getDocuments()
  }
}

export default ProdigiService