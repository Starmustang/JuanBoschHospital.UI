import { Patient, PatientUpdate } from "@/app/(DashboardLayout)/types/patient/patient";
import { StateCreator } from "zustand";
import { MainStore } from "./index";
import { toast } from "react-toastify";
import axiosMain from "../services";

export interface PatientSlice {
    patientList: Patient[];
    patientDetailed: Patient;
    showPatientModal: boolean;
    getPatientList: () => Promise<void>;
    getPatientDetailed: (id: number) => Promise<void>;
    createPatient: (patient: Patient) => Promise<void>;
    updatePatient: (patient: PatientUpdate) => Promise<void>;
    deletePatient: (id: number) => Promise<void>;
    handleOpenPatientModal: () => void;
    handleClosePatientModal: () => void;
}

export const createPatientSlice: StateCreator<MainStore, [], [], PatientSlice> = (set, get) => ({
    patientList: [],
    patientDetailed: {} as Patient,
    showPatientModal: false,
    getPatientList: async () => {
        try {
            const response = await axiosMain.get('/patient');
            set({patientList: response.data});
            toast.success('Lista de pacientes obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de pacientes');
        }
    },
    getPatientDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`/patient/${id}`);
            set({patientDetailed: response.data});
            toast.success('Paciente obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el paciente');
        }
    },
    createPatient: async (patient: Patient) => {
        try {
            const response = await axiosMain.post('/patient', patient);
            get().getPatientList();
            toast.success('Paciente creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el paciente');
        }
    },
    updatePatient: async (patient: PatientUpdate) => {
        try {
            await axiosMain.put(`/patient/${patient.PatientId}`, patient);
            toast.success('Paciente actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el paciente');
        }
    },
    deletePatient: async (id: number) => {
        try {
            await axiosMain.delete(`/patient/${id}`);
            get().getPatientList();
            toast.success('Paciente eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el paciente');
        }
    },
    handleOpenPatientModal: () => {
        set({showPatientModal: true});
    },
    handleClosePatientModal: () => {
        set({showPatientModal: false});
    },
})