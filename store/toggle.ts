import { create } from 'zustand'

type Store = {
  dark: boolean
  toggle: () => void
}

export const useToggleStore = create<Store>((set) => ({
  dark: false,
  toggle: () => set((state) => ({ dark: !state.dark })),
}))