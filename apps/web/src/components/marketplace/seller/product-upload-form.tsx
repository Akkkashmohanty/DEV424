"use client"

import { useState } from "react"
import { UploadCloud, CheckCircle, Sprout, Tag, DollarSign, Package } from "lucide-react"
import { toast } from "sonner"

export default function ProductUploadForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Seeds")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [success, setSuccess] = useState(false)

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !price || !stock) {
      toast.error("Please fill out all product fields!")
      return
    }

    setSuccess(true)
    toast.success("Crop listing submitted successfully!", {
      description: "Listing goes live after 10 minutes verification.",
    })

    // Reset Form
    setTitle("")
    setDescription("")
    setCategory("Seeds")
    setPrice("")
    setStock("")
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-green-600/20 bg-green-500/[0.02] p-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </span>
        <h4 className="font-black text-lg text-green-950 dark:text-green-200">Listing Uploaded!</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Your product listing is undergoing automated catalog indexing. You will receive an alert once it goes live for the community.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-10 px-6 font-bold text-xs shadow-sm transition"
        >
          Upload Another Product
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <UploadCloud className="h-5 w-5 text-green-600 animate-bounce" />
        <h3 className="text-xl font-bold tracking-tight">Upload New Listing</h3>
      </div>

      <form onSubmit={handleUpload} className="space-y-6">
        {/* Drag & Drop Visual Zone */}
        <div className="border-2 border-dashed border-border hover:border-green-600/50 bg-muted/10 rounded-2xl p-6 text-center cursor-pointer transition">
          <UploadCloud className="h-10 w-10 text-muted-foreground/60 mx-auto" />
          <h5 className="font-semibold text-xs mt-3">Drag & Drop Product Images</h5>
          <p className="text-[10px] text-muted-foreground mt-1">Supports PNG, JPG, JPEG up to 5MB</p>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" />
            Product Title
          </label>
          <input
            type="text"
            placeholder="e.g. Organic Basil Seeds (F1 High Yield)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
            Description details
          </label>
          <textarea
            placeholder="Detailed description, moisture guidelines, light placements..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
              <Sprout className="h-3.5 w-3.5" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 border border-border bg-background rounded-xl px-3 text-xs focus:outline-none focus:ring-1 focus:ring-green-600"
            >
              <option value="Seeds">Seeds</option>
              <option value="Soil">Soil</option>
              <option value="Tools">Tools</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Pots">Pots</option>
            </select>
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />
              Price (₹)
            </label>
            <input
              type="number"
              placeholder="299"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Stock */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
              <Package className="h-3.5 w-3.5" />
              Available Stock
            </label>
            <input
              type="number"
              placeholder="15"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl h-12 font-bold text-xs shadow-sm transition"
        >
          Publish Product Listing
        </button>
      </form>
    </div>
  )
}
