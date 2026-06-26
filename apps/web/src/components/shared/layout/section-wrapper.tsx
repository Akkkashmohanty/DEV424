import { cn } from "@/lib/utils"

interface SectionWrapperProps {
    children: React.ReactNode
    className?: string
}

export default function SectionWrapper({
    children,
    className,
}: SectionWrapperProps) {
    return (
        <section
            className={cn(
                "relative py-24 md:py-32",
                className,
            )}
        >
            {children}
        </section>
    )
}