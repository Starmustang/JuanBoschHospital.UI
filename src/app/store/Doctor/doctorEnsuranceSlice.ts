import { DoctorEnsurance, DoctorEnsurancePost, DoctorEnsurancePut } from "@/app/(DashboardLayout)/types/Doctor/DoctorEnsurance";
import { StateCreator } from "zustand";
import { MainStore } from "..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface DoctorEnsuranceSlice {
    doctorEnsuranceList: DoctorEnsurance[];
    doctorEnsuranceDetailed: DoctorEnsurance;
    doctorEnsuranceId?: number;
    showDoctorEnsuranceModal: boolean;
    showDeleteModal: boolean;
    selectedDoctorEnsurance: number;
    getDoctorEnsuranceList: () => Promise<void>;
    getDoctorEnsuranceDetailed: (id: number) => Promise<void>;
    createDoctorEnsurance: (doctorEnsurance: DoctorEnsurancePost) => Promise<void>;
    updateDoctorEnsurance: (doctorEnsurance: DoctorEnsurancePut) => Promise<void>;
    deleteDoctorEnsurance: (id: number) => Promise<void>;

    //create modal
    handleOpenDoctorEnsuranceModal: (id?: number) => void;
    handleCloseDoctorEnsuranceModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/DoctorEnsurance';

export const createDoctorEnsuranceSlice: StateCreator<MainStore, [], [], DoctorEnsuranceSlice> = (set, get) => ({
    doctorEnsuranceList: [],
    doctorEnsuranceDetailed: {
        doctorEnsuranceId: 0,
        doctorId: 0,
        doctorName: '',
        arsEnsuranceId: 0,
        ensuranceName: '',
        medicCode: ''
    },
    doctorEnsuranceId: 0,
    showDoctorEnsuranceModal: false,
    showDeleteModal: false,
    selectedDoctorEnsurance: 0,

    getDoctorEnsuranceList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ doctorEnsuranceList: response.data });
            toast.success('Lista de seguros de doctor obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de seguros de doctor');
        }
    },
    getDoctorEnsuranceDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ doctorEnsuranceDetailed: response.data });
            toast.success('Seguro de doctor obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el seguro de doctor');
        }
    },
    createDoctorEnsurance: async (doctorEnsurance: DoctorEnsurancePost) => {
        try {
            await axiosMain.post(url, doctorEnsurance);
            get().getDoctorEnsuranceList();
            toast.success('Seguro de doctor creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el seguro de doctor');
        }
    },
    updateDoctorEnsurance: async (doctorEnsurance: DoctorEnsurancePut) => {
        try {
            await axiosMain.put(`${url}/${doctorEnsurance.doctorEnsuranceId}`, doctorEnsurance);
            get().getDoctorEnsuranceList();
            toast.success('Seguro de doctor actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el seguro de doctor');
        }
    },
    deleteDoctorEnsurance: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getDoctorEnsuranceList();
            toast.success('Seguro de doctor eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el seguro de doctor');
        }
    },
    handleOpenDoctorEnsuranceModal: (id?: number) => {
        set({ showDoctorEnsuranceModal: true, doctorEnsuranceId: id });
    },
    handleCloseDoctorEnsuranceModal: () => {
        set({ showDoctorEnsuranceModal: false, doctorEnsuranceId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedDoctorEnsurance: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },
});