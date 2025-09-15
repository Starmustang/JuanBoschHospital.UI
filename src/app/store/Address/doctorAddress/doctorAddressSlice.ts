import { StateCreator } from "zustand";
import { MainStore } from "../../";
import { DoctorAddress } from "@/app/(DashboardLayout)/types/Address/doctorAddress/doctorAddress";
export interface DoctorAddressSlice {
    doctorAddressList: DoctorAddress[];
    showDoctorAddressModal: boolean;
    handleOpenDoctorAddressModal: () => void;
    handleCloseDoctorAddressModal: () => void;
}
export const createDoctorAddressSlice: StateCreator<MainStore, [], [], DoctorAddressSlice> = (set, get) => ({
    doctorAddressList: [],
    showDoctorAddressModal: false,
    handleOpenDoctorAddressModal: () => {
        set({showDoctorAddressModal: true});
    },
    handleCloseDoctorAddressModal: () => {
        set({showDoctorAddressModal: false});
    },
})