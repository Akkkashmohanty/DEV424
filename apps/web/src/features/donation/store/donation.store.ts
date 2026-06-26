import { create } from "zustand"

interface DonationState {
  selectedNGO: string | null

  setSelectedNGO: (
    ngo: string,
  ) => void
}

export const useDonationStore =
  create<DonationState>((set) => ({
    selectedNGO: null,

    setSelectedNGO: (ngo) =>
      set({
        selectedNGO: ngo,
      }),
  }))