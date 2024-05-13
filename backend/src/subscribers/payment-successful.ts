import { 
  type SubscriberConfig, 
  type SubscriberArgs,
  OrderService,
  CartService,
} from "@medusajs/medusa"

export default async function handlePaymentSuccessful({
  data, eventName, container, pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  const orderService: OrderService = container.resolve(
    "orderService"
  )
  const cartService: CartService = container.resolve(
    "cartService"
  )

  // const shippingMethod =  data.shipping_methods[0];
  console.log("data", data);
  

  // console.log("shippingMethod", shippingMethod);
  
  // const shippingData = shippingMethod.data //cart!
  // console.log("shippingData",shippingData);

  const order = await orderService.retrieve(data.id, {
    // you can include other relations as well
    relations: ["items", "shipping_methods"],
  })

  // const cart = await cartService({id: data.cart_id})

  console.log("order", order);
  console.log("order.shippingMethods", order.shipping_methods[0].data);

  const validatedOrderData = order.shipping_methods[0].data;

  // orderService.createFulfillment(data.id, )
  

  // console.log("orderService", orderService);
  // console.log("orderService.cartService", orderService.cartService_);
  // console.log("orderService.shippingOptionService", orderService.shippingOptionService_);
  // console.log("orderService.shippingProfileService", orderService.shippingProfileService_);
  // console.log("orderService.shippingMethod", orderService.shippingMethod);
  // const fulfillment = orderService.createFulfillment({
  //   orderId: data.id,
  //   itemsToFulfill: shippingMethod.data,
  //   config: {}
  // });

  console.log("data", data);
  
  const fulfillment = await orderService.createFulfillment(data.id, order.items.map(item => ({
    item_id: item.id,
    quantity: item.quantity
  })), validatedOrderData);

  // console.log("fulfillment", await fulfillment);
  
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PAYMENT_CAPTURED,
  // event: OrderService.Events.SHIPMENT_CREATED,
  // event: OrderService.Events.UPDATED,
  // event: CartService.Events.UPDATED,
  context: {
    subscriberId: "payment-successful-handler"
  }
};
