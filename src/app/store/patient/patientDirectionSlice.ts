import { PatientDirection, PatientDirectionPost, PatientDirectionPut } from "@/app/(DashboardLayout)/types/patient/patientDIrection";
import { StateCreator } from "zustand";
import { MainStore } from "..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface PatientDirectionSlice {
    patientDirectionList: PatientDirection[];
    patientDirectionDetailed: PatientDirection;
    addressId?: number;
    showPatientDirectionModal: boolean;
    showDeleteModal: boolean;
    selectedPatientDirection: number;
    getPatientDirectionList: () => Promise<void>;
    getPatientDirectionDetailed: (id: number) => Promise<void>;
    createPatientDirection: (patientDirection: PatientDirectionPost) => Promise<void>;
    updatePatientDirection: (patientDirection: PatientDirectionPut) => Promise<void>;
    deletePatientDirection: (id: number) => Promise<void>;

    //create modal
    handleOpenPatientDirectionModal: (id?: number) => void;
    handleClosePatientDirectionModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/PatientDirection';

export const createPatientDirectionSlice: StateCreator<MainStore, [], [], PatientDirectionSlice> = (set, get) => ({
    patientDirectionList: [],
    patientDirectionDetailed: {
        addressId: 0,
        houseNumber: '',
        houseStreet: '',
        sectorId: 0,
        sectorName: '',
        municipalityName: '',
        provinceName: '',
        countryName: ''
    },
    addressId: 0,
    showPatientDirectionModal: false,
    showDeleteModal: false,
    selectedPatientDirection: 0,

    getPatientDirectionList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ patientDirectionList: response.data });
            toast.success('Lista de direcciones de paciente obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de direcciones de paciente');
        }
    },
    getPatientDirectionDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ patientDirectionDetailed: response.data });
            toast.success('Dirección de paciente obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la dirección de paciente');
        }
    },
    createPatientDirection: async (patientDirection: PatientDirectionPost) => {
        try {
            await axiosMain.post(url, patientDirection);
            get().getPatientDirectionList();
            toast.success('Dirección de paciente creada');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear la dirección de paciente');
        }
    },
    updatePatientDirection: async (patientDirection: PatientDirectionPut) => {
        try {
            await axiosMain.put(`${url}/${patientDirection.addressId}`, patientDirection);
            get().getPatientDirectionList();
            toast.success('Dirección de paciente actualizada');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar la dirección de paciente');
        }
    },
    deletePatientDirection: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getPatientDirectionList();
            toast.success('Dirección de paciente eliminada');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar la dirección de paciente');
        }
    },
    handleOpenPatientDirectionModal: (id?: number) => {
        set({ showPatientDirectionModal: true, addressId: id });
    },
    handleClosePatientDirectionModal: () => {
        set({ showPatientDirectionModal: false, addressId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedPatientDirection: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },
});