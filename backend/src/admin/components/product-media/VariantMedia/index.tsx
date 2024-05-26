import { useAdminCustomQuery } from "medusa-react"
import UploadVariantMedia from "../UploadVariantMedia"
import {
  GetVariantMediaRequest, 
  GetVariantMediaResponse,
} from "../../../../types/variant-media"

type Notify = {
  success: (title: string, message: string) => void;
  error: (title: string, message: string) => void;
  warn: (title: string, message: string) => void;
  info: (title: string, message: string) => void;
};

const VariantMediaWidget = ({
  notify,
  productVariantId,
}: {
  notify: Notify,
  productVariantId: string
}) => {
  const { data } = useAdminCustomQuery<
    GetVariantMediaRequest, 
    GetVariantMediaResponse
  >(
    `/variant-media/${productVariantId}`,
    [`variant-media/${productVariantId}`]
  )

  const variantMedia = data?.variant_media;

  return (
    <>
      {!variantMedia && <UploadVariantMedia notify={notify} productVariantId={productVariantId} />}
      {variantMedia && <img className="max-h-20 max-w-20" src={variantMedia.src} />}
    </>
  )
}

export default VariantMediaWidget;