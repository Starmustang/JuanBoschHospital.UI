"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import MunicipalityForm from "./municipalityForm";
import { FormProvider, useForm } from "react-hook-form";
import { useMainStore } from "@/app/store";
import { Municipality } from "@/app/(DashboardLayout)/types/Address/municipality/municipality";
import { useEffect } from "react";
const MunicipalityModal = () => {
    const { showMunicipalityModal, handleCloseMunicipalityModal, createMunicipality, getProvinceList, municipalityId, getMunicipalityDetailed, municipalityDetailed, updateMunicipality } = useMainStore();
        const formMethods = useForm<Municipality>({
        defaultValues: {
            municipalityName: "",
            provinceId: 0
        }
    });
        const { handleSubmit, reset, setValue } = formMethods;
    
    const onSubmit = (data: Municipality) => {
        if(municipalityId){
            const municipality = {
                ...data,
                municipalityId: municipalityId
            }
            updateMunicipality(municipality);
        }else{
            createMunicipality(data);
        }
        btnClose();
    }
    const btnClose = () => {
        reset();
        handleCloseMunicipalityModal();
    }
        useEffect(() => {
        getProvinceList();
    }, [getProvinceList]);

    useEffect(() => {
        if(municipalityId){
            getMunicipalityDetailed(municipalityId);
        }
    }, [municipalityId, getMunicipalityDetailed]);

    useEffect(() => {
        if(municipalityDetailed && municipalityId){
            setValue('municipalityName', municipalityDetailed.municipalityName);
            setValue('provinceId', municipalityDetailed.provinceId);
        }
    }, [municipalityDetailed, municipalityId, setValue]);

    return (
        <Dialog open={showMunicipalityModal} onClose={btnClose}>
            <DialogTitle>Municipio</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                <MunicipalityForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{municipalityId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default MunicipalityModal;