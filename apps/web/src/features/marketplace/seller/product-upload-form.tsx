"use client"

import { useForm } from "react-hook-form"

export default function ProductUploadForm() {
  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = async () => {}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border bg-card p-8"
    >
      <h2 className="text-3xl font-bold">
        Upload Product
      </h2>

      <input
        placeholder="Product Title"
        {...register("title")}
        className="h-12 w-full rounded-2xl border px-4"
      />

      <textarea
        placeholder="Description"
        {...register("description")}
        className="min-h-[120px] w-full rounded-2xl border p-4"
      />

      <input
        type="number"
        placeholder="Price"
        {...register("price")}
        className="h-12 w-full rounded-2xl border px-4"
      />

      <input
        type="file"
        className="w-full"
      />

      <button className="rounded-2xl bg-green-600 px-8 py-3 text-white">
        Upload Product
      </button>
    </form>
  )
}