import { StateCreator } from "zustand";
import { MainStore } from "../../index";
import { Sector } from "@/app/(DashboardLayout)/types/Address/sector/sector";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface SectorSlice {
    sectorList: Sector[];
    sectorDetailed: Sector;
    showSectorModal: boolean;
    sectorId?: number;
    showDeleteModal: boolean;
    selectedSector: number;
    getSectorList: () => Promise<void>;
    getSectorDetailed: (id: number) => Promise<void>;
    createSector: (sector: Sector) => Promise<void>;
    updateSector: (sector: Sector) => Promise<void>;
    deleteSector: (id: number) => Promise<void>;

    //edit and create modal
    handleOpenSectorModal: (id?: number) => void;
    handleCloseSectorModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

const url = '/sector';

export const createSectorSlice: StateCreator<MainStore, [], [], SectorSlice> = (set, get) => ({
    sectorList: [],
    sectorDetailed: {
        sectorName: "",
        sectorId: 0,
        municipalityId: 0,
        municipalityName: "",
    },
    sectorId: 0,
    showSectorModal: false,
    showDeleteModal: false,
    selectedSector: 0,

    handleOpenSectorModal: (id?: number) => {
        set({ showSectorModal: true, sectorId: id || undefined });
    },
    handleCloseSectorModal: () => {
        set({ showSectorModal: false, sectorId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedSector: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },

    getSectorList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ sectorList: response.data });
            toast.success('Lista de sectores obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de sectores');
        }
    },
    getSectorDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ sectorDetailed: response.data });
            toast.success('Sector obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el sector');
        }
    },
    createSector: async (sector: Sector) => {
        try {
            await axiosMain.post(url, sector);
            get().getSectorList();
            toast.success('Sector creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el sector');
        }
    },
    updateSector: async (sector: Sector) => {
        try {
            await axiosMain.put(`${url}/${sector.sectorId}`, sector);
            get().getSectorList();
            toast.success('Sector actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el sector');
        }
    },
    deleteSector: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getSectorList();
            toast.success('Sector eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el sector');
        }
    },
});
