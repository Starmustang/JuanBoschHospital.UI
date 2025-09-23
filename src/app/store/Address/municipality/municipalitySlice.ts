import { Municipality } from "@/app/(DashboardLayout)/types/Address/municipality/municipality";
import { MainStore } from "../..";
import { StateCreator } from "zustand";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface MunicipalitySlice {
    municipalityList: Municipality[];    
    showMunicipalityModal: boolean;
    municipalityDetailed: Municipality;
    municipalityId?: number;
    selectedMunicipality: number;
    showDeleteModal: boolean;
    getMunicipalityList: () => Promise<void>;
    getMunicipalityDetailed: (id: number) => Promise<void>;
    createMunicipality: (municipality: Municipality) => Promise<void>;
    updateMunicipality: (municipality: Municipality) => Promise<void>;
    deleteMunicipality: (id: number) => Promise<void>;
    handleOpenMunicipalityModal: (id?: number) => void;
    handleCloseMunicipalityModal: () => void;
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/municipality';
export const createMunicipalitySlice: StateCreator<MainStore, [], [], MunicipalitySlice> = (set, get) => ({
    municipalityList: [],
    showMunicipalityModal: false,
    municipalityId: undefined,
    municipalityDetailed: {
        municipalityName: "",
        municipalityId: 0,
    },
    selectedMunicipality: 0,
    showDeleteModal: false,
    handleOpenMunicipalityModal: (id?: number) => {
        set({showMunicipalityModal: true, municipalityId: id || undefined});
    },
    handleCloseMunicipalityModal: () => {
        set({showMunicipalityModal: false, municipalityId: undefined});
    },
        handleOpenDeleteModal: (id: number) => {
        set({selectedMunicipality: id, showDeleteModal: true});
    },
        handleCloseDeleteModal: () => {
        set({showDeleteModal: false});
    },
    getMunicipalityList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({municipalityList: response.data});
            toast.success('Lista de municipios obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de municipios');
        }
    },
    getMunicipalityDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({municipalityDetailed: response.data});
            toast.success('Municipio obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el municipio');
        }
    },
    createMunicipality: async (municipality: Municipality) => {
        try {
            await axiosMain.post(url, municipality);
            get().getMunicipalityList();
            toast.success('Municipio creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el municipio');
        }
    },
    updateMunicipality: async (municipality: Municipality) => {
        try {
            await axiosMain.put(`${url}/${municipality.municipalityId}`, municipality);
            get().getMunicipalityList();
            toast.success('Municipio actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el municipio');
        }
    },
    deleteMunicipality: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getMunicipalityList();
            toast.success('Municipio eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el municipio');
        }
    },
})
