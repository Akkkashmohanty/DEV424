import { create } from "zustand"
import { Product } from "../types/product.types"

interface WishlistState {
  wishlist: Product[]

  addToWishlist: (product: Product) => void
}

export const useWishlistStore =
  create<WishlistState>((set, get) => ({
    wishlist: [],

    addToWishlist: (product) => {
      const exists = get().wishlist.find(
        (item) => item.id === product.id,
      )

      if (!exists) {
        set({
          wishlist: [...get().wishlist, product],
        })
      }
    },
  }))