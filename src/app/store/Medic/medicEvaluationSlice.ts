import { MedicEvaluations, MedicEvaluationsPost, MedicEvaluationsPut } from "@/app/(DashboardLayout)/types/medic/medicEvaluations";
import { StateCreator } from "zustand";
import { MainStore } from "..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface MedicEvaluationSlice {
    medicEvaluationsList: MedicEvaluations[];
    medicEvaluationDetailed: MedicEvaluations;
    medicEvaluationId?: number;
    showMedicEvaluationModal: boolean;
    showDeleteModal: boolean;
    selectedMedicEvaluation: number;
    getMedicEvaluationsList: () => Promise<void>;
    getMedicEvaluationDetailed: (id: number) => Promise<void>;
    createMedicEvaluation: (medicEvaluation: MedicEvaluationsPost) => Promise<void>;
    updateMedicEvaluation: (medicEvaluation: MedicEvaluationsPut) => Promise<void>;
    deleteMedicEvaluation: (id: number) => Promise<void>;

    //create modal
    handleOpenMedicEvaluationModal: (id?: number) => void;
    handleCloseMedicEvaluationModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/MedicEvaluation';

export const createMedicEvaluationSlice: StateCreator<MainStore, [], [], MedicEvaluationSlice> = (set, get) => ({
    medicEvaluationsList: [],
    medicEvaluationDetailed: {
        medicEvaluationId: 0,
        weightEva: 0,
        presurreEva: 0,
        breathingEva: 0,
        heartRateEva: "",
        otherInfoEva: "",
        heightEva: "",
        previousSickNessEva: ""
    },
    medicEvaluationId: 0,
    showMedicEvaluationModal: false,
    showDeleteModal: false,
    selectedMedicEvaluation: 0,

    getMedicEvaluationsList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ medicEvaluationsList: response.data });
            toast.success('Lista de evaluaciones obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de evaluaciones');
        }
    },
    getMedicEvaluationDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ medicEvaluationDetailed: response.data });
            toast.success('Evaluación obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la evaluación');
        }
    },
    createMedicEvaluation: async (medicEvaluation: MedicEvaluationsPost) => {
        try {
            await axiosMain.post(url, medicEvaluation);
            get().getMedicEvaluationsList();
            toast.success('Evaluación creada');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear la evaluación');
        }
    },
    updateMedicEvaluation: async (medicEvaluation: MedicEvaluationsPut) => {
        try {
            await axiosMain.put(`${url}/${medicEvaluation.medicEvaluationId}`, medicEvaluation);
            get().getMedicEvaluationsList();
            toast.success('Evaluación actualizada');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar la evaluación');
        }
    },
    deleteMedicEvaluation: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getMedicEvaluationsList();
            toast.success('Evaluación eliminada');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar la evaluación');
        }
    },
    handleOpenMedicEvaluationModal: (id?: number) => {
        set({ showMedicEvaluationModal: true, medicEvaluationId: id });
    },
    handleCloseMedicEvaluationModal: () => {
        set({ showMedicEvaluationModal: false, medicEvaluationId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedMedicEvaluation: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },
});
