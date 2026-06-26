"use client"

import { useQuery } from "@tanstack/react-query"
import { marketplaceApi } from "../api/marketplace.api"

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: marketplaceApi.getProducts,
  })
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      marketplaceApi.getProduct(productId),
  })
}