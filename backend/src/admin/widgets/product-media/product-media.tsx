import type { 
  WidgetConfig, 
  ProductDetailsWidgetProps,
} from "@medusajs/admin"

// import UploadVariantMedia from "../../../admin/components/product-media/UploadVariantMedia"
import UploadVariantMedia from "../../components/product-media/UploadVariantMedia"
// admin/components/product-media/UploadVariantMedia"
import Dropdown from "../../components/Dropdown"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

const ProductWidget = ({
  product,
  notify,
}: ProductDetailsWidgetProps) => {
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg flex justify-between">
      {/* <h1>Product Widget {product.title}</h1> */}
      {/* {JSON.stringify(product.variants)}
      <button 
        className="bg-black rounded p-1 text-white"
        onClick={() => notify.success("success", "You clicked the button!")}
      >
        Click me
      </button> */}
      <UploadVariantMedia />
      <Dropdown options={product.variants} />

    </div>
  )
}

export const config: WidgetConfig = {
  zone: "product.details.before",
}

export default ProductWidget