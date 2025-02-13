import { create } from 'zustand'

type IUseFilterStore = {
    filterCountries: string[]
    setFilterCountries: (countries: string[]) => void
}

export const useFilterStore = create<IUseFilterStore>((set) => ({
    filterCountries: [],
    setFilterCountries: (countries) => set({ filterCountries: countries }),
}))