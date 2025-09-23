'use client'
import { FormProvider, useForm } from "react-hook-form";
import { Blood, BloodPost, BloodPut } from "../../types/Blood/blood";
import { useMainStore } from "@/app/store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import BloodForm from "./bloodForm";
import { useEffect } from "react";

const BloodModal = () => {
    const { showBloodModal, handleCloseBloodModal, bloodId, getBloodDetailed, bloodDetailed, createBlood, updateBlood } = useMainStore();
    const formMethods = useForm<Blood>();
    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleCloseBloodModal();
    }

    const onSubmit = (data: Blood) => {
        const bloodData: BloodPost = {
            bloodType: data.bloodType,
            consentBlood: data.consentBlood,
        };

        if (bloodId) {
            const bloodToUpdate: BloodPut = {
                bloodId: bloodId,
                ...bloodData,
            };
            updateBlood(bloodToUpdate);
        } else {
            createBlood(bloodData);
        }
        btnClose();
    }

    useEffect(() => {
        if (bloodId) {
            getBloodDetailed(bloodId);
        }
    }, [bloodId, getBloodDetailed]);

    useEffect(() => {
        if (bloodDetailed && bloodId) {
            setValue('bloodType', bloodDetailed.bloodType);
            setValue('consentBlood', bloodDetailed.consentBlood);
        }
    }, [bloodDetailed, bloodId, setValue]);

    return (
        <Dialog
            open={showBloodModal}
            onClose={btnClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{bloodId ? 'Editar' : 'Agregar'} Tipo de Sangre</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <BloodForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{bloodId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default BloodModal;