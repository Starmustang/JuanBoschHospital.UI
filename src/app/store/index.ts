import { create } from "zustand";
import { createPatientSlice, PatientSlice } from "./patientSlice";
import { devtools } from "zustand/middleware";
import { createCountrySlice, CountrySlice } from "./Address/Country/countrySlice";

export type MainStore = PatientSlice & CountrySlice;

export const useMainStore = create<MainStore>()(
    devtools(
        (...a)=>({
            ...createPatientSlice(...a),
            ...createCountrySlice(...a)
        }),
        {name: 'MainStore'}
    ),
);

