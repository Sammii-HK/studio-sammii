import { useState } from "react"
import {
  useAdminCustomPost, 
  useAdminUploadProtectedFile,
} from "medusa-react"
import { 
  CreateVariantMediaRequest, 
  CreateVariantMediaResponse, 
} from "../../../../types/variant-media"
import { 
  Button, 
  Input, 
  Label, 
} from "@medusajs/ui"
import { RouteProps } from "@medusajs/admin-ui"

const UploadVariantMedia = ({
  notify,
  productVariantId,
}: {
  notify: RouteProps,
  productVariantId: string
}) => {
  // const [name, setName] = useState("")
  const [file, setFile] = useState<File>()
  
  const uploadFile = useAdminUploadProtectedFile()
  const { 
    mutate: createVariantMedia,
    isLoading,
  } = useAdminCustomPost<
    CreateVariantMediaRequest,
    CreateVariantMediaResponse
  >(
    "/variant-media",
    ["variant-media"]
  )

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()    

    uploadFile.mutate(file, {
      onSuccess: ({ uploads }) => {
        if (!("key" in uploads[0])) {
          return
        }
        // create the digital product
        createVariantMedia({
          variant_id: productVariantId,
          file_key: uploads[0].key as string,
          mime_type: file.type,
        }, {
          onSuccess: () => {
            console.log("success");
            
            // notify.success(
            //   "Success", 
            //   "Digital Product Created Successfully"
            // )
            // navigate("/a/product-media")
          },
        })
      },
    })
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="flex gap-4 col-auto"
      >
        <div className="flex gap-4 items-center">
          <Input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <Button 
          variant="primary" 
          type="submit" 
          isLoading={
            uploadFile.isLoading || 
            isLoading
          }>
          Upload
        </Button>
      </form>
    </>
  )
}

export default UploadVariantMedia;