import type { 
  WidgetConfig, 
  ProductDetailsWidgetProps,
} from "@medusajs/admin"

import VariantMediaWidget from "../../components/product-media/VariantMedia"

const ProductWidget = ({
  product,
  notify,
}: ProductDetailsWidgetProps) => {
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg flex-col justify-between min-h-24 max-h-96">
      {product?.variants?.map(variant => (
        <div className="py-2" key={`media-list-item-${variant.id}`}>
          <div className="flex">
            <h2 className="mr-4">{variant.title}</h2>
            <VariantMediaWidget notify={notify} productVariantId={variant.id} />
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}

export const config: WidgetConfig = {
  zone: "product.details.before",
}

export default ProductWidget