"use client"

export default function PhotoUpload() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-bold">
        Upload Harvest Photo
      </h3>

      <input
        type="file"
        className="mt-6 w-full"
      />

      <button className="mt-6 rounded-2xl bg-green-600 px-6 py-3 text-white">
        Upload
      </button>
    </div>
  )
}