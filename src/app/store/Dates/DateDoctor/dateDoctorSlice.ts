import { DateDoctor, DateDoctorPost, DateDoctorPut } from "@/app/(DashboardLayout)/types/Dates/DateDoctor/dateDoctor";
import { StateCreator } from "zustand";
import { MainStore } from "../../index";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface DateDoctorSlice {
    dateDoctorList: DateDoctor[];
    dateDoctorDetailed: DateDoctor;
    dateDoctorId?: number;
    showDateDoctorModal: boolean;
    showDeleteModal: boolean;
    selectedDateDoctor: number;
    getDateDoctorList: () => Promise<void>;
    getDateDoctorDetailed: (id: number) => Promise<void>;
    createDateDoctor: (dateDoctor: DateDoctorPost) => Promise<void>;
    updateDateDoctor: (dateDoctor: DateDoctorPut) => Promise<void>;
    deleteDateDoctor: (id: number) => Promise<void>;

    //create modal
    handleOpenDateDoctorModal: (id?: number) => void;
    handleCloseDateDoctorModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/DateDoctor';

export const createDateDoctorSlice: StateCreator<MainStore, [], [], DateDoctorSlice> = (set, get) => ({
    dateDoctorList: [],
    dateDoctorDetailed: {
        dateDoctorId: 0,
        dateDoctorSintoms: "",
        dateDoctorIndicatedAnalisis: "",
        dateDoctorTreatment: "",
        dateDoctorNotes: "",
        dateDoctorNextDate: new Date(),
        medicEvaluationId: 0
    },
    dateDoctorId: 0,
    showDateDoctorModal: false,
    showDeleteModal: false,
    selectedDateDoctor: 0,

    getDateDoctorList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ dateDoctorList: response.data });
            toast.success('Lista de citas obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de citas');
        }
    },
    getDateDoctorDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ dateDoctorDetailed: response.data });
            toast.success('Cita obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la cita');
        }
    },
    createDateDoctor: async (dateDoctor: DateDoctorPost) => {
        try {
            await axiosMain.post(url, dateDoctor);
            get().getDateDoctorList();
            toast.success('Cita creada');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear la cita');
        }
    },
    updateDateDoctor: async (dateDoctor: DateDoctorPut) => {
        try {
            await axiosMain.put(`${url}/${dateDoctor.dateDoctorId}`, dateDoctor);
            get().getDateDoctorList();
            toast.success('Cita actualizada');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar la cita');
        }
    },
    deleteDateDoctor: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getDateDoctorList();
            toast.success('Cita eliminada');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar la cita');
        }
    },
    handleOpenDateDoctorModal: (id?: number) => {
        set({ showDateDoctorModal: true, dateDoctorId: id });
    },
    handleCloseDateDoctorModal: () => {
        set({ showDateDoctorModal: false, dateDoctorId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedDateDoctor: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },
});
