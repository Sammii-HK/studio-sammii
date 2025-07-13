import { Module } from "@medusajs/framework/utils"
import ProdigiFulfillmentProvider from "./providers/prodigi-fulfillment"

export default Module("prodigi", {
  providers: [ProdigiFulfillmentProvider],
}) 