"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import MobileMenu from "./mobile-menu"
import { NAV_LINKS } from "./nav-links"

export default function Navbar() {
    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="
        sticky top-0 z-50
        border-b border-white/10
        bg-black/20
        backdrop-blur-xl
      "
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="text-2xl font-black tracking-tight text-white"
                >
                    Farm<span className="text-emerald-400">Gym</span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="
                text-sm font-medium text-gray-300
                transition hover:text-white
              "
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-4 lg:flex">
                    <Link
                        href="/login"
                        className="
              rounded-xl
              border border-white/10
              px-4 py-2
              text-white
              hover:bg-white/10
            "
                    >
                        Login
                    </Link>

                    <Link
                        href="/signup"
                        className="
              rounded-2xl
              bg-emerald-500
              px-5 py-3
              font-semibold
              text-white
              transition
              hover:bg-emerald-400
            "
                    >
                        Get Started
                    </Link>
                </div>

                <MobileMenu />
            </div>
        </motion.header>
    )
}