import { create } from "zustand";
import { createPatientSlice, PatientSlice } from "./patientSlice";
import { devtools } from "zustand/middleware";

type MainStore = 
    PatientSlice;

export const useMainStore = create<MainStore>()(
    devtools(
        (...a)=>({
            ...createPatientSlice(...a)
        }),
        {name: 'MainStore'}
    ),
);

