import { PatientDirection } from "@/app/(DashboardLayout)/types/patient/patientDIrection";
import { StateCreator } from "zustand";
import { MainStore } from "../index";

export interface PatientDirectionSlice {
    patientDirectionList: PatientDirection[];    
    showPatientDirectionModal: boolean;
    handleOpenPatientDirectionModal: () => void;
    handleClosePatientDirectionModal: () => void;
}

export const createPatientDirectionSlice: StateCreator<MainStore, [], [], PatientDirectionSlice> = (set, get) => ({
    patientDirectionList: [],
    showPatientDirectionModal: false,
    handleOpenPatientDirectionModal: () => {
        set({showPatientDirectionModal: true});
    },
    handleClosePatientDirectionModal: () => {
        set({showPatientDirectionModal: false});
    },
})