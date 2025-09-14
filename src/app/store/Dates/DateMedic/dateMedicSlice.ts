import { DateMedic } from "@/app/(DashboardLayout)/types/Dates/DateMedic/dateMedic";
import { StateCreator } from "zustand";
import { MainStore } from "../../";

export interface DateMedicSlice {
    dateMedicList: DateMedic[];
    showDateMedicModal: boolean;
    handleOpenDateMedicModal: () => void;
    handleCloseDateMedicModal: () => void; 
}

export const createDateMedicSlice: StateCreator<MainStore, [], [], DateMedicSlice> = (set, get) => ({
    dateMedicList: [],
    showDateMedicModal: false,
    handleOpenDateMedicModal: () => {
        set({showDateMedicModal: true});        
    },
    handleCloseDateMedicModal: () => {
        set({showDateMedicModal: false});
    },
});