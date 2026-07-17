"use client"

import { useState } from "react"

import {
  UploadCloud,
  Loader2,
} from "lucide-react"

import { toast } from "sonner"

import {
  useCreateProduct,
} from "@/features/marketplace/hooks/use-products"

export default function ProductUploadForm() {
  const createProduct = useCreateProduct()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Seeds")
  const [brand, setBrand] = useState("FarmGym")
  const [unit, setUnit] = useState("Pack")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault()

    if (
      !name ||
      !description ||
      !price ||
      !stock
    ) {
      toast.error("Fill all required fields.")
      return
    }

    try {
      await createProduct.mutateAsync({
        name,
        description,
        category,
        brand,
        unit,

        sku: `SKU-${Date.now()}`,

        price: Number(price),

        stock: Number(stock),

        image_url:
          imageUrl.trim() || null,
      })

      toast.success(
        "Product created successfully.",
      )

      setName("")
      setDescription("")
      setCategory("Seeds")
      setBrand("FarmGym")
      setUnit("Pack")
      setPrice("")
      setStock("")
      setImageUrl("")
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ??
        "Unable to create product.",
      )
    }
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <div className="mb-6 flex items-center gap-2">
        <UploadCloud className="h-5 w-5 text-green-600" />

        <h2 className="text-xl font-bold">
          Upload Product
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Brand"
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
            className="rounded-xl border p-3"
          />

          <input
            placeholder="Unit"
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value)
            }
            className="rounded-xl border p-3"
          />
        </div>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        >
          <option>Seeds</option>
          <option>Tools</option>
          <option>Pots</option>
          <option>Fertilizer</option>
          <option>Soil</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="rounded-xl border p-3"
          />
        </div>

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <button
          disabled={createProduct.isPending}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {createProduct.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  )
}