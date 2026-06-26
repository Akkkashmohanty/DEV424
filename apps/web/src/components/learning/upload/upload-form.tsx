"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Upload, FileVideo } from "lucide-react"

interface FormValues {
  title: string
  description: string
  category: string
  language: string
}

export default function UploadForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      language: "",
    },
  })

  const onSubmit = async (
    data: FormValues,
  ) => {
    console.log({
      ...data,
      videoFile,
      thumbnailFile,
    })

    reset()
    setVideoFile(null)
    setThumbnailFile(null)

    alert("Tutorial uploaded successfully!")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-xl"
    >
      <div>
        <h1 className="text-3xl font-bold text-white">
          Upload Farming Tutorial
        </h1>

        <p className="mt-2 text-slate-400">
          Share your farming knowledge with the community.
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Video Title
          </label>

          <input
            {...register("title")}
            placeholder="Enter tutorial title"
            className="h-12 w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Description
          </label>

          <textarea
            {...register("description")}
            placeholder="Describe your tutorial"
            className="min-h-[140px] w-full rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <select
            {...register("category")}
            className="h-12 rounded-2xl border border-slate-700 bg-slate-800 px-4 text-white"
          >
            <option value="">Select Category</option>
            <option>Terrace Farming</option>
            <option>Organic Farming</option>
            <option>Hydroponics</option>
          </select>

          <select
            {...register("language")}
            className="h-12 rounded-2xl border border-slate-700 bg-slate-800 px-4 text-white"
          >
            <option value="">Select Language</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Kannada</option>
          </select>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-600 p-6">
          <label className="cursor-pointer">
            <div className="flex items-center gap-3 text-white">
              <Upload className="h-5 w-5" />
              Upload Thumbnail
            </div>

            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setThumbnailFile(
                  e.target.files?.[0] || null,
                )
              }
            />
          </label>

          {thumbnailFile && (
            <p className="mt-3 text-sm text-green-400">
              {thumbnailFile.name}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-dashed border-slate-600 p-6">
          <label className="cursor-pointer">
            <div className="flex items-center gap-3 text-white">
              <FileVideo className="h-5 w-5" />
              Upload Video
            </div>

            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setVideoFile(
                  e.target.files?.[0] || null,
                )
              }
            />
          </label>

          {videoFile && (
            <p className="mt-3 text-sm text-green-400">
              {videoFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="h-12 rounded-2xl bg-green-600 font-semibold text-white hover:bg-green-700"
        >
          Upload Tutorial
        </button>
      </div>
    </form>
  )
}