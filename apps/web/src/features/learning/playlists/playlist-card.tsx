interface Props {
  title: string
  videos: number
}

export default function PlaylistCard({
  title,
  videos,
}: Props) {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-muted-foreground">
        {videos} videos
      </p>
    </div>
  )
}