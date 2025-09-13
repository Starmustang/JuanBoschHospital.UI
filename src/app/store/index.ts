import { create } from "zustand";
import { createPatientSlice, PatientSlice } from "./patientSlice";
import { devtools } from "zustand/middleware";
import { createCountrySlice, CountrySlice } from "./Address/Country/countrySlice";
import { createProvinceSlice, ProvinceSlice } from "./Address/Province/provinceSlice";
import { createMunicipalitySlice, MunicipalitySlice } from "./Address/municipality/municipalitySlice";
import { createSectorSlice, SectorSlice } from "./Address/sector/sectorSlice";

export type MainStore = 
PatientSlice & 
CountrySlice & 
ProvinceSlice & 
MunicipalitySlice & 
SectorSlice;

export const useMainStore = create<MainStore>()(
    devtools(
        (...a)=>({
            ...createPatientSlice(...a),
            ...createCountrySlice(...a),
            ...createProvinceSlice(...a),
            ...createMunicipalitySlice(...a)
        }),
        {name: 'MainStore'}
    ),
);

