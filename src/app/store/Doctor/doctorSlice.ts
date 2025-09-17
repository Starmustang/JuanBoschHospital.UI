import { Doctor } from "@/app/(DashboardLayout)/types/Doctor/Doctor";
import { MainStore } from "..";
import { StateCreator } from "zustand";

export interface DoctorSlice {
    doctorList: Doctor[];
    showDoctorModal: boolean;
    handleOpenDoctorModal: () => void;
    handleCloseDoctorModal: () => void;
}

export const createDoctorSlice: StateCreator<MainStore, [], [], DoctorSlice> = (set, get) => ({
    doctorList: [],
    showDoctorModal: false,
    handleOpenDoctorModal: () => {
        set({showDoctorModal: true});
    },
    handleCloseDoctorModal: () => {
        set({showDoctorModal: false})
    }
})