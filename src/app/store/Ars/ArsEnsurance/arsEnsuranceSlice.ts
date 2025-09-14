import { ArsEnsurance } from "@/app/(DashboardLayout)/types/Ars/ArsEnsurance/arsEnsurance";
import { StateCreator } from "zustand";
import { MainStore } from "../..";

export interface ArsEnsuranceSlice {
    arsEnsuranceList: ArsEnsurance[];
    showArsEnsuranceModal: boolean;
    handleOpenArsEnsuranceModal: () => void;
    handleCloseArsEnsuranceModal: () => void;
}

export const createArsEnsuranceSlice: StateCreator<MainStore, [], [], ArsEnsuranceSlice> = (set, get) => ({
    arsEnsuranceList: [],
    showArsEnsuranceModal: false,
    handleOpenArsEnsuranceModal: () => {
        set({showArsEnsuranceModal: true});
    },
    handleCloseArsEnsuranceModal: () => {
        set({showArsEnsuranceModal: false});
    },
})
