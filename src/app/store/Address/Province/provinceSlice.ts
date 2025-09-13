import { Province } from "@/app/(DashboardLayout)/types/Address/province/province";
import { StateCreator } from "zustand";
import { MainStore } from "../..";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";

export interface ProvinceSlice {
    provinceList: Province[];
    provinceDetailed: Province;
    showProvinceModal: boolean;
    getProvinceList: () => Promise<void>;
    getProvinceDetailed: (id: number) => Promise<void>;
    createProvince: (province: Province) => Promise<void>;
    updateProvince: (province: Province) => Promise<void>;
    deleteProvince: (id: number) => Promise<void>;
    handleOpenProvinceModal: () => void;
    handleCloseProvinceModal: () => void;
}

export const createProvinceSlice: StateCreator<MainStore, [], [], ProvinceSlice> = (set, get) => ({
provinceList: [],
provinceDetailed: {
    provinceName: "",
    provinceId: 0,
},
showProvinceModal: false,
getProvinceList: async () => {
    try {
        const response = await axiosMain.get('/province');
        set({provinceList: response.data});
        toast.success('Lista de provincias obtenida');
    } catch (error) {
        console.log(error);
        toast.error('Error al obtener la lista de provincias');
    }
},
getProvinceDetailed: async (id: number) => {
    try {
        const response = await axiosMain.get(`/province/${id}`);
        set({provinceDetailed: response.data});
        toast.success('Provincia obtenida');
    } catch (error) {
        console.log(error);
        toast.error('Error al obtener la provincia');
    }
},
createProvince: async (province: Province) => {
    try {
        const response = await axiosMain.post('/province', province);
        get().getProvinceList();
        toast.success('Provincia creada');
    } catch (error) {
        console.log(error);
        toast.error('Error al crear la provincia');
    }
},
updateProvince: async (province: Province) => {
    try {
        await axiosMain.put(`/province/${province.provinceId}`, province);
        get().getProvinceList();
        toast.success('Provincia actualizada');
    } catch (error) {
        console.log(error);
        toast.error('Error al actualizar la provincia');
    }
},
deleteProvince: async (id: number) => {
    try {
        await axiosMain.delete(`/province/${id}`);
        get().getProvinceList();
        toast.success('Provincia eliminada');
    } catch (error) {
        console.log(error);
        toast.error('Error al eliminar la provincia');
    }
},
handleOpenProvinceModal: () => {
    set({showProvinceModal: true});
},
handleCloseProvinceModal: () => {
    set({showProvinceModal: false});
},    
})