import ProductDetails from "@/components/marketplace/product/product-details"

interface Props {
  params: Promise<{
    productId: string
  }>
}

export default async function ProductPage({
  params,
}: Props) {
  const { productId } = await params

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <ProductDetails
          productId={Number(productId)}
        />
      </div>
    </main>
  )
}