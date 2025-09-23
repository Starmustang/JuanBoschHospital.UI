import { MedicRecords, MedicRecordsPost, MedicRecordsPut } from "@/app/(DashboardLayout)/types/medic/medicRecords";
import { StateCreator } from "zustand";
import { MainStore } from "..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface MedicRecordsSlice {
    medicRecordsList: MedicRecords[];
    medicRecordDetailed: MedicRecords | null;
    medicRecordId: number | null;
    showMedicRecordsModal: boolean;
    showDeleteMedicRecordModal: boolean;
    getMedicRecordsList: () => Promise<void>;
    getMedicRecordDetailed: (id: number) => Promise<void>;
    createMedicRecord: (data: MedicRecordsPost) => Promise<void>;
    updateMedicRecord: (data: MedicRecordsPut) => Promise<void>;
    deleteMedicRecord: (id: number) => Promise<void>;
    handleOpenMedicRecordsModal: (id?: number) => void;
    handleCloseMedicRecordsModal: () => void;
    handleOpenDeleteMedicRecordModal: (id: number) => void;
    handleCloseDeleteMedicRecordModal: () => void;
}

const url = '/MedicRecords';

export const createMedicRecordsSlice: StateCreator<MainStore, [], [], MedicRecordsSlice> = (set, get) => ({
    medicRecordsList: [],
    medicRecordDetailed: null,
    medicRecordId: null,
    showMedicRecordsModal: false,
    showDeleteMedicRecordModal: false,
    getMedicRecordsList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ medicRecordsList: response.data });
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de records medicos');
        }
    },
    getMedicRecordDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ medicRecordDetailed: response.data });
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el detalle del record medico');
        }
    },
    createMedicRecord: async (data: MedicRecordsPost) => {
        try {
            await axiosMain.post(url, data);
            toast.success('Record medico creado con éxito');
            get().getMedicRecordsList();
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el record medico');
        }
    },
    updateMedicRecord: async (data: MedicRecordsPut) => {
        try {
            await axiosMain.put(`${url}/${data.recordId}`, data);
            toast.success('Record medico actualizado con éxito');
            get().getMedicRecordsList();
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el record medico');
        }
    },
    deleteMedicRecord: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            toast.success('Record medico eliminado con éxito');
            get().getMedicRecordsList();
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el record medico');
        }
    },
    handleOpenMedicRecordsModal: (id?: number) => {
        set({ showMedicRecordsModal: true, medicRecordId: id || null });
    },
    handleCloseMedicRecordsModal: () => {
        set({ showMedicRecordsModal: false, medicRecordId: null, medicRecordDetailed: null });
    },
    handleOpenDeleteMedicRecordModal: (id: number) => {
        set({ showDeleteMedicRecordModal: true, medicRecordId: id });
    },
    handleCloseDeleteMedicRecordModal: () => {
        set({ showDeleteMedicRecordModal: false, medicRecordId: null });
    },
});
