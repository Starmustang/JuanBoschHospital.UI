import { MedicRecords } from "@/app/(DashboardLayout)/types/medic/medicRecords";
import { StateCreator } from "zustand";
import { MainStore } from "..";

export interface MedicRecordsSlice {
    medicRecordsList: MedicRecords[];
    showMedicRecordsModal: boolean;
    handleOpenMedicRecordsModal: () => void;
    handleCloseMedicRecordsModal: () => void;
}
export const createMedicRecordsSlice: StateCreator<MainStore, [], [], MedicRecordsSlice> = (set, get) => ({
    medicRecordsList: [],
    showMedicRecordsModal: false,
    handleOpenMedicRecordsModal: () => {
        set({showMedicRecordsModal: true});
    },
    handleCloseMedicRecordsModal: () => {
        set({showMedicRecordsModal: false});
    },
})
