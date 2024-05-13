import { AbstractFulfillmentService, Cart, Fulfillment, LineItem, Order } from "@medusajs/medusa"
// import { getProductDetails } from "../utils/prodigi/getProductDetails";
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";
import { ProdigiOrder, createOrder } from "./fulfilmentServices/prodigi/create-order";

class ProdigiService extends AbstractFulfillmentService {
  static identifier = "prodigi"

  constructor(container, options) {
    super(container)
    // you can access options here
    // you can also initialize a client that
    // communicates with a third-party service.
    // this.client = new Client(options);
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
    console.log("data", data);
    return createOrder(data)
    // return {

    // }
  }

  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: Cart
  ): Promise<Record<string, unknown>> {    
    if (optionData.id !== "prodigi-standard" && optionData.id !== "prodigi-first-class") {
      throw new Error("invalid data")
    }

    console.log("data", data);
    

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
      "items": cart.items.map(item => ({
          sku: item.variant.sku,
          copies: item.quantity,
          sizing: 'fillPrintArea',
          assets: [
            {
              "printArea": "default",
              "url": item.thumbnail
            }
          ]
        })
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