import { Product } from "../types/product.types"

export const products: Product[] = [
  {
    id: 1,
    seller_id: 1,
    name: "Organic Tomato Seeds",
    description: "Premium organic tomato seeds",
    price: 299,
    stock: 25,
    category: "Seeds",
    image_url:
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    seller_id: 2,
    name: "Compost Soil Mix",
    description: "Nutrient-rich compost soil",
    price: 599,
    stock: 15,
    category: "Soil",
    image_url:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    is_active: true,
    created_at: new Date().toISOString(),
  },
]