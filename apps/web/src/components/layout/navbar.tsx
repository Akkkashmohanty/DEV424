"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-black text-white"
        >
          Farm<span className="text-emerald-400">Gym</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="text-gray-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#marketplace"
            className="text-gray-300 transition hover:text-white"
          >
            Marketplace
          </a>

          <a
            href="#community"
            className="text-gray-300 transition hover:text-white"
          >
            Community
          </a>

          <a
            href="#about"
            className="text-gray-300 transition hover:text-white"
          >
            About
          </a>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Link
            href="/signup"
            className="rounded-2xl bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-400"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#04111d]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-6 px-6 py-8">
            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="text-lg text-white"
            >
              Features
            </a>

            <a
              href="#marketplace"
              onClick={() => setOpen(false)}
              className="text-lg text-white"
            >
              Marketplace
            </a>

            <a
              href="#community"
              onClick={() => setOpen(false)}
              className="text-lg text-white"
            >
              Community
            </a>

            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="text-lg text-white"
            >
              About
            </a>

            <Link
              href="/signup"
              className="rounded-xl bg-emerald-500 py-3 text-center font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}