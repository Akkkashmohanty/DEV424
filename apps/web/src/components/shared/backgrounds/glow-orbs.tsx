export default function GlowOrbs() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="absolute bottom-[10%] right-[10%] h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-3xl" />
        </div>
    )
}