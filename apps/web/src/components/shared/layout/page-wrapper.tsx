import { cn } from "@/lib/utils"

interface PageWrapperProps {
    children: React.ReactNode
    className?: string
}

export default function PageWrapper({
    children,
    className,
}: PageWrapperProps) {
    return (
        <main
            className={cn(
                "relative min-h-screen overflow-hidden bg-[#030712] text-white",
                className,
            )}
        >
            {children}
        </main>
    )
}