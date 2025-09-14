import { blood } from "@/app/(DashboardLayout)/types/Blood/blood";
import { StateCreator } from "zustand";
import { MainStore } from "..";

export interface BloodSlice {
    bloodList: blood [];
    showbloodModal: boolean;
    handleOpenBloodModal: () => void;
    handleCloseBloodModal: () => void;
}

export const createBloodSlice: StateCreator<MainStore, [], [], BloodSlice> = (set, get) => ({
    bloodList: [],
    showbloodModal: false,
    handleOpenBloodModal: () => {
        set({showbloodModal: true});
    },
    handleCloseBloodModal: () => {
        set({showbloodModal: false})
    }
})