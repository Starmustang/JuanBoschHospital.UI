import { create } from "zustand";
import { createPatientSlice, PatientSlice } from "./patientSlice";
import { devtools } from "zustand/middleware";
import { createCountrySlice, CountrySlice } from "./Address/Country/countrySlice";
import { createProvinceSlice, ProvinceSlice } from "./Address/Province/provinceSlice";
import { createMunicipalitySlice, MunicipalitySlice } from "./Address/municipality/municipalitySlice";
import { createSectorSlice, SectorSlice } from "./Address/sector/sectorSlice";
import { blood } from "../(DashboardLayout)/types/Blood/blood";
import { BloodSlice, createBloodSlice } from "./Blood/bloodSlice";
import { createArsEnsuranceSlice, ArsEnsuranceSlice } from "./Ars/ArsEnsurance/arsEnsuranceSlice";
import { createArsPlanSlice, ArsPlanSlice } from "./Ars/ArsPlan/arsPlanSlice";

export type MainStore = 
PatientSlice & 
CountrySlice & 
ProvinceSlice & 
MunicipalitySlice & 
BloodSlice &    
SectorSlice &
ArsEnsuranceSlice &
ArsPlanSlice;

export const useMainStore = create<MainStore>()(
    devtools(
        (...a)=>({
            ...createPatientSlice(...a),
            ...createCountrySlice(...a),
            ...createProvinceSlice(...a),
            ...createMunicipalitySlice(...a),
            ...createSectorSlice(...a),
            ...createBloodSlice(...a),
            ...createArsEnsuranceSlice(...a),
            ...createArsPlanSlice(...a)
        }),
        {name: 'MainStore'}
    ),
);

