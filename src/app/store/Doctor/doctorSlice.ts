import { Doctor, DoctorPost, DoctorPut } from "@/app/(DashboardLayout)/types/Doctor/Doctor";
import { MainStore } from "..";
import { StateCreator } from "zustand";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface DoctorSlice {
    doctorList: Doctor[];
    doctorDetailed: Doctor;
    showDoctorModal: boolean;
    doctorId?: number;
    showDeleteModal: boolean;
    selectedDoctor: number;
    getDoctorList: () => Promise<void>;
    getDoctorDetailed: (id: number) => Promise<void>;
    createDoctor: (doctor: DoctorPost) => Promise<void>;
    updateDoctor: (doctor: DoctorPut) => Promise<void>;
    deleteDoctor: (id: number) => Promise<void>;

    //edit and create modal
    handleOpenDoctorModal: (id?: number) => void;
    handleCloseDoctorModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/Doctor';

export const createDoctorSlice: StateCreator<MainStore, [], [], DoctorSlice> = (set, get) => ({
    doctorList: [],
    doctorDetailed: {
        doctorId: 0,
        doctorName: '',
        doctorLastName: '',
        doctorPhone: '',
        doctorEmail: '',
        doctorIdCard: '',
        doctorPassport: '',
        doctorSpeciality: '',
        doctorAddressId: 0,
        doctorHouseNumber: '',
        doctorStreet: '',
        doctorExecatur: ''
    },
    doctorId: 0,
    showDoctorModal: false,
    showDeleteModal: false,
    selectedDoctor: 0,

    handleOpenDoctorModal: (id?: number) => {
        set({ showDoctorModal: true, doctorId: id || undefined });
    },
    handleCloseDoctorModal: () => {
        set({ showDoctorModal: false, doctorId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedDoctor: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },

    getDoctorList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ doctorList: response.data });
            toast.success('Lista de doctores obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de doctores');
        }
    },
    getDoctorDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ doctorDetailed: response.data });
            toast.success('Doctor obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el doctor');
        }
    },
    createDoctor: async (doctor: DoctorPost) => {
        try {
            await axiosMain.post(url, doctor);
            get().getDoctorList();
            toast.success('Doctor creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el doctor');
        }
    },
    updateDoctor: async (doctor: DoctorPut) => {
        try {
            await axiosMain.put(`${url}/${doctor.doctorId}`, doctor);
            get().getDoctorList();
            toast.success('Doctor actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el doctor');
        }
    },
    deleteDoctor: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getDoctorList();
            toast.success('Doctor eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el doctor');
        }
    },
});