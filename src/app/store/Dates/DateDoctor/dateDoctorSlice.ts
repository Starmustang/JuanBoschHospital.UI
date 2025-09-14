import { DateDoctor } from "@/app/(DashboardLayout)/types/Dates/DateDoctor/dateDoctor";
import { StateCreator } from "zustand";
import { MainStore } from "../..";

export interface DateDoctorSlice {
    dateDoctorList: DateDoctor[];
    showDateDoctorModal: boolean;
    handleOpenDateDoctorModal: () => void;
    handleCloseDateDoctorModal: () => void; 
}

export const createDateDoctorSlice: StateCreator<MainStore, [], [], DateDoctorSlice> = (set, get) => ({
    dateDoctorList: [],
    showDateDoctorModal: false,
    handleOpenDateDoctorModal: () => {
        set({showDateDoctorModal: true});
    },
    handleCloseDateDoctorModal: () => {
        set({showDateDoctorModal: false});
    },
})
