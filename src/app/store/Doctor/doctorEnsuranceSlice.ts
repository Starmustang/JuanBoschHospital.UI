import { DoctorEnsurance } from "@/app/(DashboardLayout)/types/Doctor/DoctorEnsurance";
import { StateCreator } from "zustand";

export interface DoctorEnsuranceSlice {
    doctorEnsuranceList: DoctorEnsurance[];
    showDoctorEnsuranceModal: boolean;
    handleOpenDoctorEnsuranceModal: () => void;
    handleCloseDoctorEnsuranceModal: () => void;
}

export const createDoctorEnsuranceSlice: StateCreator<DoctorEnsuranceSlice> = (set) => ({
    doctorEnsuranceList: [],
    showDoctorEnsuranceModal: false,
    handleOpenDoctorEnsuranceModal: () => set({showDoctorEnsuranceModal: true}),
    handleCloseDoctorEnsuranceModal: () => set({showDoctorEnsuranceModal: false})
})