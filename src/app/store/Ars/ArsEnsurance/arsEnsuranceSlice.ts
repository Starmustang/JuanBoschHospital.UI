import { ArsEnsurance, ArsEnsurancePost, ArsEnsurancePut } from "@/app/(DashboardLayout)/types/Ars/ArsEnsurance/arsEnsurance";
import { StateCreator } from "zustand";
import { MainStore } from "../../index";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface ArsEnsuranceSlice {
    arsEnsuranceList: ArsEnsurance[];
    arsEnsuranceDetailed: ArsEnsurance;
    arsEnsuranceId?: number;
    showArsEnsuranceModal: boolean;
    showDeleteModal: boolean;
    selectedArsEnsurance: number;
    getArsEnsuranceList: () => Promise<void>;
    getArsEnsuranceDetailed: (id: number) => Promise<void>;
    createArsEnsurance: (arsEnsurance: ArsEnsurancePost) => Promise<void>;
    updateArsEnsurance: (arsEnsurance: ArsEnsurancePut) => Promise<void>;
    deleteArsEnsurance: (id: number) => Promise<void>;

    //create modal
    handleOpenArsEnsuranceModal: (id?: number) => void;
    handleCloseArsEnsuranceModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/ArsEnsurance';

export const createArsEnsuranceSlice: StateCreator<MainStore, [], [], ArsEnsuranceSlice> = (set, get) => ({
    arsEnsuranceList: [],
    arsEnsuranceDetailed: {
        ensuranceName: "",
        ensuranceDirection: "",
        ensurancePhone: "",
        ensurancePhone2: "",
        ensuranceFax: "",
        ensuranceEmail: "",
        ensuranceSchedule: "",
        ensuranceRnc: "",
        ensuranceUpdateDate: new Date(),
    },
    arsEnsuranceId: 0,
    showArsEnsuranceModal: false,
    showDeleteModal: false,
    selectedArsEnsurance: 0,

    handleOpenDeleteModal: (id: number) => {
        set({ selectedArsEnsurance: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },

    getArsEnsuranceList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ arsEnsuranceList: response.data });
            toast.success('Lista de ARS obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de ARS');
        }
    },
    getArsEnsuranceDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ arsEnsuranceDetailed: response.data });
            toast.success('ARS obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la ARS');
        }
    },
    createArsEnsurance: async (arsEnsurance: ArsEnsurancePost) => {
        try {
            await axiosMain.post(url, arsEnsurance);
            get().getArsEnsuranceList();
            toast.success('ARS creada');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear la ARS');
        }
    },
    updateArsEnsurance: async (arsEnsurance: ArsEnsurancePut) => {
        try {
            await axiosMain.put(`${url}/${arsEnsurance.arsEnsuranceId}`, arsEnsurance);
            get().getArsEnsuranceList();
            toast.success('ARS actualizada');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar la ARS');
        }
    },
    deleteArsEnsurance: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getArsEnsuranceList();
            toast.success('ARS eliminada');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar la ARS');
        }
    },
    handleOpenArsEnsuranceModal: (id?: number) => {
        set({ showArsEnsuranceModal: true, arsEnsuranceId: id || undefined });
    },
    handleCloseArsEnsuranceModal: () => {
        set({ showArsEnsuranceModal: false, arsEnsuranceId: undefined });
    },
});
