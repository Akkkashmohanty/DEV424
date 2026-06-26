"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { NAV_LINKS } from "./nav-links"

export default function MobileMenu() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="
          flex items-center justify-center
          rounded-xl
          border border-white/10
          bg-white/5
          p-2
          text-white
          backdrop-blur-xl
          lg:hidden
        "
            >
                <Menu size={22} />
            </button>

            {open && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md">
                    <div className="absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-[#030712] p-6">
                        <div className="mb-8 flex items-center justify-between">
                            <span className="text-lg font-bold text-white">
                                FarmGym
                            </span>

                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-lg p-2 text-white"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="
                    text-base
                    font-medium
                    text-gray-300
                    transition
                    hover:text-emerald-400
                  "
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-10 flex flex-col gap-4">
                            <Link
                                href="/login"
                                onClick={() => setOpen(false)}
                                className="
                  rounded-xl
                  border border-white/10
                  px-4 py-3
                  text-center
                  font-medium
                  text-white
                "
                            >
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                onClick={() => setOpen(false)}
                                className="
                  rounded-xl
                  bg-emerald-500
                  px-4 py-3
                  text-center
                  font-semibold
                  text-white
                  hover:bg-emerald-400
                "
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}