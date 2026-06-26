import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import QueryProvider from "@/providers/query-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FarmGym — Urban Farming Meets Fitness",
  description:
    "FarmGym combines urban farming and fitness helping users grow food while burning calories sustainably.",
  keywords: [
    "urban farming",
    "fitness",
    "sustainability",
    "balcony farming",
    "smart farming",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}