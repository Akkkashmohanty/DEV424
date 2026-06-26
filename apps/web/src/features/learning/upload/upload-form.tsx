"use client"

import { useForm } from "react-hook-form"

interface FormValues {
  title: string
  description: string
  category: string
  language: string
}

export default function UploadForm() {
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
    console.log(data)

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
    >
      <div>
        <h1 className="text-3xl font-bold text-white">
          Upload Farming Tutorial
        </h1>

        <p className="mt-2 text-white/70">
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
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40 outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Description
          </label>

          <textarea
            {...register("description")}
            placeholder="Describe your tutorial"
            className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-white/40 outline-none focus:border-green-500"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Category
            </label>

            <select
              {...register("category")}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-green-500"
            >
              <option value="" className="bg-slate-900">
                Select Category
              </option>

              <option
                value="terrace"
                className="bg-slate-900"
              >
                Terrace Farming
              </option>

              <option
                value="organic"
                className="bg-slate-900"
              >
                Organic Farming
              </option>

              <option
                value="hydroponics"
                className="bg-slate-900"
              >
                Hydroponics
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Language
            </label>

            <select
              {...register("language")}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-green-500"
            >
              <option value="" className="bg-slate-900">
                Select Language
              </option>

              <option
                value="english"
                className="bg-slate-900"
              >
                English
              </option>

              <option
                value="hindi"
                className="bg-slate-900"
              >
                Hindi
              </option>

              <option
                value="kannada"
                className="bg-slate-900"
              >
                Kannada
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Upload Thumbnail
          </label>

          <input
            type="file"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white file:mr-4 file:rounded-xl file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Upload Video
          </label>

          <input
            type="file"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white file:mr-4 file:rounded-xl file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-white"
          />
        </div>

        <button
          type="submit"
          className="h-12 rounded-2xl bg-green-600 font-semibold text-white transition hover:bg-green-700"
        >
          Upload Tutorial
        </button>
      </div>
    </form>
  )
}