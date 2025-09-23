import { StateCreator } from "zustand";
import { MainStore } from "../../";
import { DoctorAddress, DoctorAddressPost, DoctorAddressPut } from "@/app/(DashboardLayout)/types/Address/doctorAddress/doctorAddress";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface DoctorAddressSlice {
    doctorAddressList: DoctorAddress[];
    doctorAddressDetailed: DoctorAddress;
    showDoctorAddressModal: boolean;
    doctorAddressId?: number;
    showDeleteModal: boolean;
    selectedDoctorAddress: number;
    getDoctorAddressList: () => Promise<void>;
    getDoctorAddressDetailed: (id: number) => Promise<void>;
    createDoctorAddress: (doctorAddress: DoctorAddressPost) => Promise<void>;
    updateDoctorAddress: (doctorAddress: DoctorAddressPut) => Promise<void>;
    deleteDoctorAddress: (id: number) => Promise<void>;

    //edit and create modal
    handleOpenDoctorAddressModal: (id?: number) => void;
    handleCloseDoctorAddressModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/DoctorAddress';

export const createDoctorAddressSlice: StateCreator<MainStore, [], [], DoctorAddressSlice> = (set, get) => ({
    doctorAddressList: [],
    doctorAddressDetailed: {
        doctorAddressId: 0,
        doctorHouseNumber: "",
        doctorStreet: "",
        sectorId: 0,
        sectorName: "",
    },
    doctorAddressId: 0,
    showDoctorAddressModal: false,
    showDeleteModal: false,
    selectedDoctorAddress: 0,

    handleOpenDoctorAddressModal: (id?: number) => {
        set({ showDoctorAddressModal: true, doctorAddressId: id || undefined });
    },
    handleCloseDoctorAddressModal: () => {
        set({ showDoctorAddressModal: false, doctorAddressId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedDoctorAddress: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },

    getDoctorAddressList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ doctorAddressList: response.data });
            toast.success('Lista de direcciones obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de direcciones');
        }
    },
    getDoctorAddressDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ doctorAddressDetailed: response.data });
            toast.success('Dirección obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la dirección');
        }
    },
    createDoctorAddress: async (doctorAddress: DoctorAddressPost) => {
        try {
            await axiosMain.post(url, doctorAddress);
            get().getDoctorAddressList();
            toast.success('Dirección creada');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear la dirección');
        }
    },
    updateDoctorAddress: async (doctorAddress: DoctorAddressPut) => {
        try {
            await axiosMain.put(`${url}/${doctorAddress.doctorAddressId}`, doctorAddress);
            get().getDoctorAddressList();
            toast.success('Dirección actualizada');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar la dirección');
        }
    },
    deleteDoctorAddress: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getDoctorAddressList();
            toast.success('Dirección eliminada');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar la dirección');
        }
    },
});