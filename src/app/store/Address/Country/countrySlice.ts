import { Country } from "@/app/(DashboardLayout)/types/Address/country/country";
import axiosMain from "@/app/services";
import { toast } from "react-toastify";
import { StateCreator } from "zustand";
import { MainStore } from "../../index";

export interface CountrySlice {
    countryList: Country[];
    countryDetailed: Country;
    countryId: number;
    showCountryModal: boolean;
    showDeleteModal: boolean;
    selectedCountry: number;
    getCountryList: () => Promise<void>;
    getCountryDetailed: (id: number) => Promise<void>;
    createCountry: (country: Country) => Promise<void>;
    updateCountry: (country: Country) => Promise<void>;
    deleteCountry: (id: number) => Promise<void>;
    
    //create modal
    handleOpenCountryModal: (id?: number) => void;
    handleCloseCountryModal: () => void;
    
    //delete modal
    handleOpenDeleteModal: (id: number) => void;
    handleCloseDeleteModal: () => void;
}

export const createCountrySlice: StateCreator<MainStore, [], [], CountrySlice> = (set, get) => ({
    countryList: [],
    countryDetailed: {
        countryName: "",
        countryLanguage: "",
        countryCurrency: ""
    },
    countryId: 0,
    showCountryModal: false,
    showDeleteModal: false,
    selectedCountry: 0,

    handleOpenDeleteModal: (id?: number) => {
        set({selectedCountry: id || undefined});
        set({showDeleteModal: true});
    },
    handleCloseDeleteModal: () => {
        set({showDeleteModal: false, });
    },
    
    getCountryList: async () => {
        try {
            const response = await axiosMain.get('/country');
            set({countryList: response.data});
            toast.success('Lista de paises obtenida');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener la lista de paises');
        }
    },
    getCountryDetailed: async (id: number) => {
        try {
            const response = await axiosMain.get(`/country/${id}`);
            set({countryDetailed: response.data});
            toast.success('Pais obtenido');
        } catch (error) {
            console.log(error);
            toast.error('Error al obtener el pais');
        }
    },
    createCountry: async (country: Country) => {
        try {
            await axiosMain.post('/country', country);
            get().getCountryList();
            toast.success('Pais creado');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el pais');
        }
    },
    updateCountry: async (country: Country) => {
        try {
            await axiosMain.put(`/country/${country.countryId}`, country);
            get().getCountryList();
            toast.success('Pais actualizado');
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el pais');
        }
    },
    deleteCountry: async (id: number) => {
        try {
            await axiosMain.delete(`/country/${id}`);
            get().getCountryList();
            toast.success('Pais eliminado');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar el pais');
        }
    },
    handleOpenCountryModal: (id?: number) => {
        set({showCountryModal: true, countryId: id || undefined});
    },
    handleCloseCountryModal: () => {
        set({showCountryModal: false, countryId: undefined});
    },
})
