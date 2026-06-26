import { products } from "../mock/products.mock"

export const marketplaceApi = {
  async getProducts() {
    return Promise.resolve(products)
  },

  async getProduct(productId: string) {
    return Promise.resolve(
      products.find(
        (product) => product.id === productId,
      ),
    )
  },
}