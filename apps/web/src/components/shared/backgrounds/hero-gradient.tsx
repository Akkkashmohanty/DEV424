export default function HeroGradient() {
    return (
        <>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="absolute right-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-lime-400/10 blur-3xl" />

                <div className="absolute bottom-[-20%] left-[30%] h-[600px] w-[600px] rounded-full bg-green-600/10 blur-3xl" />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%)]" />
        </>
    )
}