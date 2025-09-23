"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import ProvinceForm from "./provinceForm";
import { useMainStore } from "@/app/store";
import { Province } from "@/app/(DashboardLayout)/types/Address/province/province";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { useEffect } from "react";
const ProvinceModal = () => {
    const { showProvinceModal, handleCloseProvinceModal, createProvince, getCountryList, provinceId, getProvinceDetailed, provinceDetailed, updateProvince } = useMainStore();
    const formMethods = useForm<Province>({
        defaultValues: {
            provinceName: "",
            countryId: 0
        }
    });
    const { handleSubmit, reset, setValue } = formMethods;

    const onSubmit = (data: Province) => {
        if(provinceId){
            const province = {
                ...data,
                provinceId: provinceId
            }
            updateProvince(province);
        }else{
            createProvince(data);
        }
        btnClose();
    }

    const btnClose = () => {
        reset();
        handleCloseProvinceModal();
    }

    useEffect(() => {
        getCountryList();
    }, [getCountryList]);

    useEffect(() => {
        if(provinceId){
            getProvinceDetailed(provinceId);
        }
    }, [provinceId, getProvinceDetailed]);

    useEffect(() => {
        if(provinceDetailed && provinceId){
            setValue('provinceName', provinceDetailed.provinceName);
            setValue('countryId', provinceDetailed.countryId);
        }
    }, [provinceDetailed, provinceId, setValue]);

    return (
       <Dialog open={showProvinceModal} onClose={btnClose}>
        <DialogTitle>Provincia</DialogTitle>
        <DialogContent>
            <FormProvider {...formMethods}>
            <ProvinceForm />
            </FormProvider>
        </DialogContent>
        <DialogActions>
            <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
            <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{provinceId ? 'Editar' : 'Guardar'}</Button>
        </DialogActions>
       </Dialog>
    );
}
export default ProvinceModal;