import { RouteConfig } from "@medusajs/admin"
import { Photo } from "@medusajs/icons"
import { useAdminCustomQuery } from "medusa-react"
import { 
  ListVariantMediasRequest, 
  ListVariantMediasResponse,
} from "../../../types/variant-media"
import { 
  Button, 
  Container, 
  Drawer, 
  Heading,
  Table,
} from "@medusajs/ui"
import { Link } from "react-router-dom"
import { RouteProps } from "@medusajs/admin-ui"

const PrintMediaListPage = (props: RouteProps) => {
  const { data, isLoading } = useAdminCustomQuery<
  ListVariantMediasRequest, 
  ListVariantMediasResponse
  >(
    "/variant-media",
    ["variant-media"]
  )

  console.log("data", data);
  
  
  return (
    <Container>
      <div className="flex justify-between mb-4">
        <Heading level="h1">Print Media</Heading>
      </div>
      {isLoading && <div>Loading...</div>}
      {data && !data.variant_medias.length && (
        <div>No Products</div>
      )}
      {data && data.variant_medias.length > 0 && (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>File Key</Table.HeaderCell>
              <Table.HeaderCell>
                Media
              </Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.variant_medias?.map((variant_media) => (
              <Table.Row key={variant_media.id}>
                <Table.Cell>
                  {variant_media.file_key}
                </Table.Cell>
                <Table.Cell>
                  {variant_media.src && <img src={variant_media.src} />}
                </Table.Cell>
                <Table.Cell>
                  {variant_media.variant && <div>
                    {variant_media.variant.product.title}
                  </div>}
                </Table.Cell>
                {/* {getVariantMedia(variant_media.variant_id) && <Table.Cell>
                  <img src={getVariantMedia(variant_media.variant_id)} />
                </Table.Cell>} */}
                <Table.Cell>
                  <Link to={`/a/products/${
                    variant_media.variant.product_id
                  }`}>
                    View Product
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Print Assets",
    icon: Photo,
  },
}

export default PrintMediaListPage