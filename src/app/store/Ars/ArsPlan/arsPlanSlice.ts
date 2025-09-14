import { StateCreator } from "zustand";
import { MainStore } from "../../";
import { ArsPlan } from "@/app/(DashboardLayout)/types/Ars/ArsPlan/arsPlan";

export interface ArsPlanSlice {
    arsPlanList: ArsPlan[];
    showArsPlanModal: boolean;
    handleOpenArsPlanModal: () => void;
    handleCloseArsPlanModal: () => void;
}

export const createArsPlanSlice: StateCreator<MainStore, [], [], ArsPlanSlice> = (set, get) => ({
    arsPlanList: [],
    showArsPlanModal: false,
    handleOpenArsPlanModal: () => {
        set({showArsPlanModal: true});
    },
    handleCloseArsPlanModal: () => {
        set({showArsPlanModal: false});
    },
})
