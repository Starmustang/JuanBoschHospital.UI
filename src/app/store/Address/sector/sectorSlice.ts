import { StateCreator } from "zustand";
import { MainStore } from "../../index";
import { Sector } from "@/app/(DashboardLayout)/types/Address/sector/sector";

export interface SectorSlice {
    sectorList: Sector[];
    showSectorModal: boolean;
    handleOpenSectorModal: () => void;
    handleCloseSectorModal: () => void;
}

export const createSectorSlice: StateCreator<MainStore, [], [], SectorSlice> = (set, get) => ({
    sectorList: [],
    showSectorModal: false,
    handleOpenSectorModal: () => {
        set({showSectorModal: true});
    },
    handleCloseSectorModal: () => {
        set({showSectorModal: false});
    },
})
