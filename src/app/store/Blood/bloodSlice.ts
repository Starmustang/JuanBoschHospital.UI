import { Blood, BloodPost, BloodPut } from "@/app/(DashboardLayout)/types/Blood/blood";
import { StateCreator } from "zustand";
import { MainStore } from "..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface BloodSlice {
    bloodList: Blood[];
    bloodDetailed: Blood;
    bloodId?: number;
    showBloodModal: boolean;
    showDeleteModal: boolean;
    selectedBlood: number;
    getBloodList: () => Promise<void>;
    getBloodDetailed: (id: number) => Promise<void>;
    createBlood: (blood: BloodPost) => Promise<void>;
    updateBlood: (blood: BloodPut) => Promise<void>;
    deleteBlood: (id: number) => Promise<void>;

    //create modal
    handleOpenBloodModal: (id?: number) => void;
    handleCloseBloodModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/Blood';

export const createBloodSlice: StateCreator<MainStore, [], [], BloodSlice> = (set, get) => ({
    bloodList: [],
    bloodDetailed: {
        bloodId: 0,
        bloodType: '',
        consentBlood: false
    },
    bloodId: 0,
    showBloodModal: false,
    showDeleteModal: false,
    selectedBlood: 0,

    getBloodList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ bloodList: response.data });
            toast.success('Lista de tipos de sangre obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de tipos de sangre');
        }
    },
    getBloodDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ bloodDetailed: response.data });
            toast.success('Tipo de sangre obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el tipo de sangre');
        }
    },
    createBlood: async (blood: BloodPost) => {
        try {
            await axiosMain.post(url, blood);
            get().getBloodList();
            toast.success('Tipo de sangre creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el tipo de sangre');
        }
    },
    updateBlood: async (blood: BloodPut) => {
        try {
            await axiosMain.put(`${url}/${blood.bloodId}`, blood);
            get().getBloodList();
            toast.success('Tipo de sangre actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el tipo de sangre');
        }
    },
    deleteBlood: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getBloodList();
            toast.success('Tipo de sangre eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el tipo de sangre');
        }
    },
    handleOpenBloodModal: (id?: number) => {
        set({ showBloodModal: true, bloodId: id });
    },
    handleCloseBloodModal: () => {
        set({ showBloodModal: false, bloodId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedBlood: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },
});