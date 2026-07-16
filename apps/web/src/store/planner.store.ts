import { create } from "zustand"

interface PlannerState {
    plan: any | null

    loading: boolean

    error: string | null

    setPlan: (
        plan: any,
    ) => void

    setLoading: (
        loading: boolean,
    ) => void

    setError: (
        error: string | null,
    ) => void

    clearPlan: () => void
}

export const usePlannerStore =
    create<PlannerState>((set) => ({
        plan: null,

        loading: false,

        error: null,

        setPlan: (
            plan,
        ) =>
            set({
                plan,
                error: null,
            }),

        setLoading: (
            loading,
        ) =>
            set({
                loading,
            }),

        setError: (
            error,
        ) =>
            set({
                error,
            }),

        clearPlan: () =>
            set({
                plan: null,
                loading: false,
                error: null,
            }),
    }))