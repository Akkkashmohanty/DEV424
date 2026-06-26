import { Product } from "../types/product.types"

export const products: Product[] = [
  {
    id: "1",
    title: "Organic Tomato Seeds",
    description: "Premium organic tomato seeds",
    image:
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa",
    category: "Seeds",
    price: 299,
    rating: 4.8,
    reviews: 145,
    stock: 25,
    seller: "Green Farms",
  },
  {
    id: "2",
    title: "Compost Soil Mix",
    description: "Nutrient-rich compost soil",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    category: "Soil",
    price: 599,
    rating: 4.7,
    reviews: 85,
    stock: 15,
    seller: "Urban Soil",
  },
]