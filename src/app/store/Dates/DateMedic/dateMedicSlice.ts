import { DateMedic, DateMedicPost, DateMedicPut } from "@/app/(DashboardLayout)/types/Dates/DateMedic/dateMedic";
import { StateCreator } from "zustand";
import { MainStore } from "../../";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface DateMedicSlice {
    dateMedicList: DateMedic[];
    dateMedicDetailed: DateMedic;
    showDateMedicModal: boolean;
    dateMedicId?: number;
    showDeleteModal: boolean;
    selectedDateMedic: number;
    getDateMedicList: () => Promise<void>;
    getDateMedicDetailed: (id: number) => Promise<void>;
    createDateMedic: (dateMedic: DateMedicPost) => Promise<void>;
    updateDateMedic: (dateMedic: DateMedicPut) => Promise<void>;
    deleteDateMedic: (id: number) => Promise<void>;

    //edit and create modal
    handleOpenDateMedicModal: (id?: number) => void;
    handleCloseDateMedicModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/DateMedic';

export const createDateMedicSlice: StateCreator<MainStore, [], [], DateMedicSlice> = (set, get) => ({
    dateMedicList: [],
    dateMedicDetailed: {
        dateMedicId: 0,
        patientId: 0,
        doctorId: 0,
        dateMedicDate: new Date(),
        hospitalMedicDate: new Date(),
        consultationTypeId: 0,
        dateDoctorId: 0,
        patientName: '',
        doctorName: '',
        consultationTypeName: '',
    },
    dateMedicId: 0,
    showDateMedicModal: false,
    showDeleteModal: false,
    selectedDateMedic: 0,

    handleOpenDateMedicModal: (id?: number) => {
        set({ showDateMedicModal: true, dateMedicId: id || undefined });
    },
    handleCloseDateMedicModal: () => {
        set({ showDateMedicModal: false, dateMedicId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedDateMedic: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },

    getDateMedicList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ dateMedicList: response.data });
            toast.success('Lista de citas obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de citas');
        }
    },
    getDateMedicDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ dateMedicDetailed: response.data });
            toast.success('Cita obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la cita');
        }
    },
    createDateMedic: async (dateMedic: DateMedicPost) => {
        try {
            await axiosMain.post(url, dateMedic);
            get().getDateMedicList();
            toast.success('Cita creada');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear la cita');
        }
    },
    updateDateMedic: async (dateMedic: DateMedicPut) => {
        try {
            await axiosMain.put(`${url}/${dateMedic.dateMedicId}`, dateMedic);
            get().getDateMedicList();
            toast.success('Cita actualizada');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar la cita');
        }
    },
    deleteDateMedic: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getDateMedicList();
            toast.success('Cita eliminada');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar la cita');
        }
    },
});