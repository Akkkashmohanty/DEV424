"use client"

import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

type FormValues = z.infer<typeof schema>

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    console.log(data)

    reset()
  }

  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-5xl font-bold">Contact Us</h2>

            <p className="mt-6 text-lg text-muted-foreground">
              Reach out to collaborate, partner or join the FarmGym movement.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-3xl border bg-card p-8"
          >
            <div>
              <Input placeholder="Your Name" {...register("name")} />

              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input placeholder="Email Address" {...register("email")} />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Textarea
                placeholder="Write your message..."
                rows={5}
                {...register("message")}
              />

              {errors.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  )
}