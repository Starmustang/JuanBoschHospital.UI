"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import MunicipalityForm from "./municipalityForm";
import { FormProvider, useForm } from "react-hook-form";
import { useMainStore } from "@/app/store";
import { Municipality } from "@/app/(DashboardLayout)/types/Address/municipality/municipality";
const MunicipalityModal = () => {
    const { showMunicipalityModal, handleCloseMunicipalityModal } = useMainStore();
    const formMethods = useForm<Municipality>();
    const { handleSubmit, reset } = formMethods;
    
    const onSubmit = (data: Municipality) => {
        btnClose();
    }
    const btnClose = () => {
        reset();
        handleCloseMunicipalityModal();
    }
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
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
export default MunicipalityModal;