import { AbstractFulfillmentProviderService } from "@medusajs/framework/utils"

export type ProdigiOrder = {
  shippingMethod: string
  recipient: {
    address: {
      line1: string
      line2?: string
      postalOrZipCode: string
      countryCode: string
      townOrCity: string
      stateOrCounty: string
    }
    name: string
    email: string
  }
  items: {
    sku: string
    copies: number
    sizing: string
    assets: {
      printArea: string
      url: string
    }[]
  }[]
}

export default class ProdigiFulfillmentProvider extends AbstractFulfillmentProviderService {
  static identifier = "prodigi"

  async getFulfillmentOptions() {
    return [
      {
        id: "prodigi-standard",
        name: "Prodigi Standard",
        type: "prodigi",
      },
    ]
  }

  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: any
  ) {
    if (optionData.id !== "prodigi-standard") {
      throw new Error("Invalid fulfillment option")
    }

    const PRODIGI = 'PDGI'
    const PRODIGI_SKUS = {
      CARD_SINGLE: 'CLASSIC-INV-GLOS-6X6',
      CARD_TEN: 'CLASSIC-INV-GLOS-6X6-10',
      POSTER_A4: 'GLOBAL-BLP-A4',
      POSTER_A3: 'GLOBAL-BLP-A3',
    }

    const getFulfillmentSku = (item: any) => {
      const splitSku = item.variant.sku.split(PRODIGI + '-')
      const extractedSku = splitSku[splitSku.length - 1]
      return Object.values(PRODIGI_SKUS).includes(extractedSku) ? extractedSku : null
    }

    const fulfillmentData = {
      shippingMethod: "Standard",
      recipient: {
        address: {
          line1: cart.shipping_address.address_1,
          line2: cart.shipping_address.address_2 || undefined,
          postalOrZipCode: cart.shipping_address.postal_code,
          countryCode: cart.shipping_address.country_code,
          townOrCity: cart.shipping_address.city,
          stateOrCounty: cart.shipping_address.province
        },
        name: `${cart.shipping_address.first_name} ${cart.shipping_address.last_name}`,
        email: cart.email
      },
      items: cart.items.map((item: any) => ({
        sku: getFulfillmentSku(item),
        copies: item.quantity,
        sizing: 'fillPrintArea',
        assets: [{
          printArea: "default",
          url: "https://example.com/placeholder-image.jpg" // This would be replaced with actual media URL
        }]
      }))
    }

    return fulfillmentData
  }

  async validateOption(data: Record<string, unknown>) {
    return data.id === "prodigi-standard"
  }

  async canCalculate(data: Record<string, unknown>) {
    return false
  }

  async calculatePrice(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: any
  ) {
    return cart.items.length * 1000
  }

  async createFulfillment(
    data: ProdigiOrder,
    items: any[],
    order: any,
    fulfillment: any
  ) {
    const prodigiOrder = await this.createProdigiOrder(data)
    
    return {
      ...fulfillment,
      metadata: {
        prodigiOrderId: prodigiOrder.order?.id
      }
    }
  }

  async cancelFulfillment(fulfillment: any) {
    const prodigiOrderId = fulfillment.metadata?.prodigiOrderId
    if (prodigiOrderId) {
      await this.cancelProdigiOrder(prodigiOrderId)
    }
    return {}
  }

  async createReturn(returnData: any) {
    return {}
  }

  async getFulfillmentDocuments(data: Record<string, unknown>) {
    return []
  }

  async getReturnDocuments(data: Record<string, unknown>) {
    return []
  }

  async getShipmentDocuments(data: Record<string, unknown>) {
    return []
  }

  async retrieveDocuments(
    fulfillmentData: Record<string, unknown>,
    documentType: "invoice" | "label"
  ) {
    return []
  }

  private async createProdigiOrder(prodigiOrder: ProdigiOrder) {
    const url = process.env.PRODIGI_API_PATH
    const reqHeaders = new Headers()
    reqHeaders.set("Cache-Control", "max-age=604800")
    reqHeaders.set("X-API-Key", process.env.PRODIGI_API_KEY!)
    reqHeaders.set("Content-Type", "application/json")

    const options = {
      headers: reqHeaders,
      method: 'POST',
      body: JSON.stringify(prodigiOrder),
    }

    const response = await fetch(url, options)
    const responseJSON = await response.json()

    console.log("Prodigi order created:", responseJSON)
    return responseJSON
  }

  private async cancelProdigiOrder(orderId: string) {
    const url = process.env.PRODIGI_API_PATH
    const reqHeaders = new Headers()
    reqHeaders.set("Cache-Control", "max-age=604800")
    reqHeaders.set("X-API-Key", process.env.PRODIGI_API_KEY!)
    reqHeaders.set("Content-Type", "application/json")

    const options = {
      headers: reqHeaders,
      method: 'POST',
    }

    const prodigiCancelOrder = `${url}/${orderId}/actions/cancel`
    const response = await fetch(prodigiCancelOrder, options)
    const responseJSON = await response.json()

    console.log("Prodigi order cancelled:", responseJSON)
    return responseJSON
  }
} 