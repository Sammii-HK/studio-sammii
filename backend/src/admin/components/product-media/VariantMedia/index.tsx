import { useEffect, useState } from "react"
import {
  useAdminCreatePresignedDownloadUrl,
  useAdminCustomQuery,
} from "medusa-react"
import { RouteProps } from "@medusajs/admin-ui"
import UploadVariantMedia from "../UploadVariantMedia"
import {
  GetVariantMediaRequest, 
  GetVariantMediaResponse,
} from "../../../../types/variant-media"

const VariantMediaWidget = ({
  notify,
  productVariantId,
}: {
  notify: RouteProps,
  productVariantId: string
}) => {
  const [mediaUrl, setMediaUrl] = useState<string>()

  const createPresignedUrl = useAdminCreatePresignedDownloadUrl()
  const handlePresignedUrl = (fileKey: string) => {
    createPresignedUrl.mutate({
      file_key: fileKey
    }, {
      onSuccess: ({ download_url }) => {
        setMediaUrl(download_url)
      }
    })
  }

  const { data } = useAdminCustomQuery<
    GetVariantMediaRequest, 
    GetVariantMediaResponse
  >(
    `/variant-media/${productVariantId}`,
    [`variant-media/${productVariantId}`]
  )
  console.log("productVariantId", productVariantId);
  console.log("data", data);
  
  
  const variantMedia = data?.variant_media;
  console.log("variantMedia", variantMedia);
  
  useEffect(() => {
    if (variantMedia) {
      handlePresignedUrl(variantMedia.file_key);
    }
  }, [variantMedia])

  return (
    <>
      {!variantMedia && <UploadVariantMedia notify={notify} productVariantId={productVariantId} />}
      {variantMedia && <img className="max-h-20 max-w-20" src={mediaUrl} />}
    </>
  )
}

export default VariantMediaWidget;