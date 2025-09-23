import { StateCreator } from "zustand";
import { MainStore } from "../../index";
import { ArsPlan, ArsPlanPost, ArsPlanPut } from "@/app/(DashboardLayout)/types/Ars/ArsPlan/arsPlan";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface ArsPlanSlice {
    arsPlanList: ArsPlan[];
    arsPlanDetailed: ArsPlan;
    arsPlanId?: number;
    showArsPlanModal: boolean;
    showDeleteModal: boolean;
    selectedArsPlan: number;
    getArsPlanList: () => Promise<void>;
    getArsPlanDetailed: (id: number) => Promise<void>;
    createArsPlan: (arsPlan: ArsPlanPost) => Promise<void>;
    updateArsPlan: (arsPlan: ArsPlanPut) => Promise<void>;
    deleteArsPlan: (id: number) => Promise<void>;

    //create modal
    handleOpenArsPlanModal: (id?: number) => void;
    handleCloseArsPlanModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/ArsPlans';

export const createArsPlanSlice: StateCreator<MainStore, [], [], ArsPlanSlice> = (set, get) => ({
    arsPlanList: [],
    arsPlanDetailed: {
        arsPlansId: 0,
        afiliationNumberArs: "",
        arsPlansName: "",
        coveragePlanArs: "",
        internationalCoverage: false,
        isPlanActive: false,
        maxLimitArs: "",
        arsEnsuranceId: 0,
        ensuranceName: "",
    },
    arsPlanId: 0,
    showArsPlanModal: false,
    showDeleteModal: false,
    selectedArsPlan: 0,

    getArsPlanList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ arsPlanList: response.data });
            toast.success('Lista de planes obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de planes');
        }
    },
    getArsPlanDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ arsPlanDetailed: response.data });
            toast.success('Plan obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el plan');
        }
    },
    createArsPlan: async (arsPlan: ArsPlanPost) => {
        try {
            await axiosMain.post(url, arsPlan);
            get().getArsPlanList();
            toast.success('Plan creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el plan');
        }
    },
    updateArsPlan: async (arsPlan: ArsPlanPut) => {
        try {
            await axiosMain.put(`${url}/${arsPlan.arsPlansId}`, arsPlan);
            get().getArsPlanList();
            toast.success('Plan actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el plan');
        }
    },
    deleteArsPlan: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getArsPlanList();
            toast.success('Plan eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el plan');
        }
    },
    handleOpenArsPlanModal: (id?: number) => {
        set({ showArsPlanModal: true, arsPlanId: id });
    },
    handleCloseArsPlanModal: () => {
        set({ showArsPlanModal: false, arsPlanId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedArsPlan: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },
});
