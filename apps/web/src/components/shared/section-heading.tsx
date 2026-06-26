interface Props {
  title: string
  subtitle: string
}

export default function SectionHeading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-4xl font-bold tracking-tight">
        {title}
      </h2>

      <p className="mt-4 text-lg text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}