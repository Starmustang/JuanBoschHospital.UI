"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";

import { FormProvider, useForm } from "react-hook-form";
import { useMainStore } from "@/app/store";
import { Sector } from "@/app/(DashboardLayout)/types/Address/sector/sector";
import SectorForm from "./sectorForm";
import { useEffect } from "react";

const SectorModal = () => {
    const { showSectorModal, handleCloseSectorModal, createSector, getMunicipalityList, sectorId, getSectorDetailed, sectorDetailed, updateSector } = useMainStore();
    const formMethods = useForm<Sector>({
        defaultValues: {
            sectorName: "",
            municipalityId: 0
        }
    });
    const { handleSubmit, reset, setValue } = formMethods;

    const onSubmit = (data: Sector) => {
        if(sectorId){
            const sector = {
                ...data,
                sectorId: sectorId
            }
            updateSector(sector);
        }else{
            createSector(data);
        }
        btnClose();
    }

    const btnClose = () => {
        reset();
        handleCloseSectorModal();
    }

    useEffect(() => {
        getMunicipalityList();
    }, [getMunicipalityList]);

    useEffect(() => {
        if(sectorId){
            getSectorDetailed(sectorId);
        }
    }, [sectorId, getSectorDetailed]);

    useEffect(() => {
        if(sectorDetailed && sectorId){
            setValue('sectorName', sectorDetailed.sectorName);
            setValue('municipalityId', sectorDetailed.municipalityId);
        }
    }, [sectorDetailed, sectorId, setValue]);

    return (
        <Dialog open={showSectorModal} onClose={btnClose}>
            <DialogTitle>{sectorId ? 'Editar' : 'Agregar'} Sector</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <SectorForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{sectorId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default SectorModal;
