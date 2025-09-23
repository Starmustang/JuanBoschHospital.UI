import { Patient, PatientPost, PatientPut } from "@/app/(DashboardLayout)/types/patient/patient";
import { StateCreator } from "zustand";
import { MainStore } from "..";
import { toast } from "react-toastify";
import axiosMain from "../../services";

export interface PatientSlice {
    patientList: Patient[];
    patientDetailed: Patient;
    patientId?: number;
    showPatientModal: boolean;
    showDeleteModal: boolean;
    selectedPatient: number;
    getPatientList: () => Promise<void>;
    getPatientDetailed: (id: number) => Promise<void>;
    createPatient: (patient: PatientPost) => Promise<void>;
    updatePatient: (patient: PatientPut) => Promise<void>;
    deletePatient: (id: number) => Promise<void>;

    //create modal
    handleOpenPatientModal: (id?: number) => void;
    handleClosePatientModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/Patient';

export const createPatientSlice: StateCreator<MainStore, [], [], PatientSlice> = (set, get) => ({
    patientList: [],
    patientDetailed: {} as Patient,
    patientId: 0,
    showPatientModal: false,
    showDeleteModal: false,
    selectedPatient: 0,

    getPatientList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ patientList: response.data });
            toast.success('Lista de pacientes obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de pacientes');
        }
    },
    getPatientDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ patientDetailed: response.data });
            toast.success('Paciente obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el paciente');
        }
    },
    createPatient: async (patient: PatientPost) => {
        try {
            await axiosMain.post(url, patient);
            get().getPatientList();
            toast.success('Paciente creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el paciente');
        }
    },
    updatePatient: async (patient: PatientPut) => {
        try {
            await axiosMain.put(`${url}/${patient.patientId}`, patient);
            get().getPatientList();
            toast.success('Paciente actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el paciente');
        }
    },
    deletePatient: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getPatientList();
            toast.success('Paciente eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el paciente');
        }
    },
    handleOpenPatientModal: (id?: number) => {
        set({ showPatientModal: true, patientId: id });
    },
    handleClosePatientModal: () => {
        set({ showPatientModal: false, patientId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedPatient: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },
});