import { Municipality } from "@/app/(DashboardLayout)/types/Address/municipality/municipality";
import { MainStore } from "../..";
import { StateCreator } from "zustand";

export interface MunicipalitySlice {
    municipalityList: Municipality[];    
    showMunicipalityModal: boolean;
    handleOpenMunicipalityModal: () => void;
    handleCloseMunicipalityModal: () => void;
}

export const createMunicipalitySlice: StateCreator<MainStore, [], [], MunicipalitySlice> = (set, get) => ({
    municipalityList: [],
    showMunicipalityModal: false,
    handleOpenMunicipalityModal: () => {
        set({showMunicipalityModal: true});
    },
    handleCloseMunicipalityModal: () => {
        set({showMunicipalityModal: false});
    },
})
