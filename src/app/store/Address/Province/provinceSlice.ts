import { Province } from "@/app/(DashboardLayout)/types/Address/province/province";
import { StateCreator } from "zustand";
import { MainStore } from "../..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface ProvinceSlice {
    provinceList: Province[];
    provinceDetailed: Province;
    showProvinceModal: boolean;
    provinceId?: number;
    showDeleteModal: boolean;
    selectedProvince: number;
    getProvinceList: () => Promise<void>;
    getProvinceDetailed: (id: number) => Promise<void>;
    createProvince: (province: Province) => Promise<void>;
    updateProvince: (province: Province) => Promise<void>;
    deleteProvince: (id: number) => Promise<void>;

    //edit and create modal
    handleOpenProvinceModal: (id?: number) => void;
    handleCloseProvinceModal: () => void;

    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}
const url = '/province';
export const createProvinceSlice: StateCreator<MainStore, [], [], ProvinceSlice> = (set, get) => ({
    provinceList: [],
    provinceDetailed: {
        provinceName: "",
        provinceId: 0,
    },
    provinceId: 0,
    showProvinceModal: false,
    showDeleteModal: false,
    selectedProvince: 0,

    handleOpenProvinceModal: (id?: number) => {
        set({ showProvinceModal: true, provinceId: id || undefined });
    },
    handleCloseProvinceModal: () => {
        set({ showProvinceModal: false, provinceId: undefined });
    },
    handleOpenDeleteModal: (id: number) => {
        set({ selectedProvince: id, showDeleteModal: true });
    },
    handleCloseDeleteModal: () => {
        set({ showDeleteModal: false });
    },

    getProvinceList: async () => {
        try {
            const response = await axiosMain.get(url);
            set({ provinceList: response.data });
            toast.success('Lista de provincias obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de provincias');
        }
    },
    getProvinceDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`${url}/${id}`);
            set({ provinceDetailed: response.data });
            toast.success('Provincia obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la provincia');
        }
    },
    createProvince: async (province: Province) => {
        try {
            await axiosMain.post(url, province);
            get().getProvinceList();
            toast.success('Provincia creada');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear la provincia');
        }
    },
    updateProvince: async (province: Province) => {
        try {
            await axiosMain.put(`${url}/${province.provinceId}`, province);
            get().getProvinceList();
            toast.success('Provincia actualizada');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar la provincia');
        }
    },
    deleteProvince: async (id: number) => {
        try {
            await axiosMain.delete(`${url}/${id}`);
            get().getProvinceList();
            toast.success('Provincia eliminada');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar la provincia');
        }
    },
});