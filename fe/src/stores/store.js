import { create } from 'zustand';

export const useCountryStore = create((set) => ({
  country: undefined,
  selectCountry: (kd_negara) => set({ country: kd_negara }) 
}));

export const useKodeBarangStore = create((set) => ({
  hs_code: '',
  kodeBarang: (new_code) => set({ hs_code: new_code }) 
}));