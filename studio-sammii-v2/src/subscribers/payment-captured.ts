import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export default async function handlePaymentCaptured({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const orderModuleService = container.resolve("orderModuleService") as any
  const fulfillmentModuleService = container.resolve("fulfillmentModuleService") as any

  const orderId = event.data.id
  
  try {
    // Retrieve the order with relations
    const order = await orderModuleService.retrieveOrder(orderId, {
      relations: ["items", "shipping_methods"],
    })

    logger.info(`Processing payment captured for order: ${orderId}`)

    if (!order.shipping_methods?.length) {
      logger.warn(`No shipping methods found for order: ${orderId}`)
      return
    }

    const shippingMethod = order.shipping_methods[0]
    const validatedOrderData = shippingMethod.data

    // Check if any items are Prodigi items (have PDGI prefix)
    const prodigiItems = order.items.filter((item: any) => 
      item.variant.sku && item.variant.sku.includes('PDGI-')
    )

    if (prodigiItems.length > 0) {
      logger.info(`Found ${prodigiItems.length} Prodigi items in order: ${orderId}`)
      
      // Create fulfillment using Prodigi provider
      const fulfillmentData = {
        location_id: "default_location",
        provider_id: "prodigi",
        shipping_option_id: shippingMethod.id,
        items: prodigiItems.map((item: any) => ({
          line_item_id: item.id,
          quantity: item.quantity,
        })),
        data: validatedOrderData,
      }

      const fulfillment = await fulfillmentModuleService.createFulfillment(fulfillmentData)
      
      logger.info(`Prodigi fulfillment created successfully for order: ${orderId} with fulfillment ID: ${fulfillment.id}`)
    } else {
      logger.info(`No Prodigi items found in order: ${orderId}, skipping Prodigi fulfillment`)
    }

  } catch (error: any) {
    logger.error(`Error processing payment captured for order: ${orderId}: ${error.message}`)
  }
}

export const config: SubscriberConfig = {
  event: "payment_collection.payment_captured",
  context: {
    subscriberId: "payment-captured-handler",
  },
} 