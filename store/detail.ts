import { create } from 'zustand'

interface ICountryStore {
    selectedCountry: any
    setSelectedCountry: (country: any) => void
}

export const useCountryStore = create<ICountryStore>((set) => ({
  selectedCountry: {},
  setSelectedCountry: (country: any) => set({ selectedCountry: country }),
}))