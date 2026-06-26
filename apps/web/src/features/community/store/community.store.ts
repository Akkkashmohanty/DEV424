import { create } from "zustand"

interface CommunityState {
  activeChallenge: string | null

  setActiveChallenge: (
    challenge: string,
  ) => void
}

export const useCommunityStore =
  create<CommunityState>((set) => ({
    activeChallenge: null,

    setActiveChallenge: (challenge) =>
      set({
        activeChallenge: challenge,
      }),
  }))