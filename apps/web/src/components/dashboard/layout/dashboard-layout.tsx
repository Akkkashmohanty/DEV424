"use client"

import { ReactNode } from "react"

import ProtectedRoute from "@/components/auth/protected-route"
import DashboardSidebar from "@/components/dashboard/layout/dashboard-sidebar"
import MobileBottomNav from "@/components/dashboard/layout/mobile-bottom-nav"

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-background">
                <DashboardSidebar />

                <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8">
                    {children}
                </main>

                <MobileBottomNav />
            </div>
        </ProtectedRoute>
    )
}