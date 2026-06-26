export default function HeroDashboardPreview() {
    return (
        <div className="mx-auto mt-20 max-w-5xl">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="text-sm text-gray-400">
                            Calories Burned
                        </p>

                        <h3 className="mt-3 text-4xl font-bold text-white">
                            2,540
                        </h3>

                        <p className="mt-2 text-sm text-emerald-400">
                            +18% this month
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="text-sm text-gray-400">
                            Active Crops
                        </p>

                        <h3 className="mt-3 text-4xl font-bold text-white">
                            18
                        </h3>

                        <p className="mt-2 text-sm text-emerald-400">
                            Tomato • Mint • Chili
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="text-sm text-gray-400">
                            Produce Donated
                        </p>

                        <h3 className="mt-3 text-4xl font-bold text-white">
                            86kg
                        </h3>

                        <p className="mt-2 text-sm text-emerald-400">
                            Supporting local NGOs
                        </p>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-semibold text-white">
                            Weekly Farming Activity
                        </h4>

                        <span className="text-sm text-emerald-400">
                            +24%
                        </span>
                    </div>

                    <div className="flex h-40 items-end gap-3">
                        <div className="h-16 flex-1 rounded-t-xl bg-emerald-500/40"></div>
                        <div className="h-24 flex-1 rounded-t-xl bg-emerald-500/50"></div>
                        <div className="h-32 flex-1 rounded-t-xl bg-emerald-500/60"></div>
                        <div className="h-20 flex-1 rounded-t-xl bg-emerald-500/50"></div>
                        <div className="h-36 flex-1 rounded-t-xl bg-emerald-500/70"></div>
                        <div className="h-28 flex-1 rounded-t-xl bg-emerald-500/60"></div>
                        <div className="h-40 flex-1 rounded-t-xl bg-emerald-500"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}