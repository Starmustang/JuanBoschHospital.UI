import { MedicEvaluations } from "@/app/(DashboardLayout)/types/medic/medicEvaluations";
import { StateCreator } from "zustand";
import { MainStore } from "..";

export interface MedicEvaluationSlice {
    medicEvaluationsList: MedicEvaluations[];
    showMedicEvaluationModal: boolean;
    handleOpenMedicEvaluationModal: () => void;
    handleCloseMedicEvaluationModal: () => void;
}
export const createMedicEvaluationSlice: StateCreator<MainStore, [], [], MedicEvaluationSlice> = (set, get) => ({
    medicEvaluationsList: [],
    showMedicEvaluationModal: false,
    handleOpenMedicEvaluationModal: () => {
        set({showMedicEvaluationModal: true});
    },
    handleCloseMedicEvaluationModal: () => {
        set({showMedicEvaluationModal: false});
    },
})
