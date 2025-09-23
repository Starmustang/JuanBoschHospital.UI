import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ArsEnsuranceForm from "./arsEnsuranceForm";
import { useMainStore } from "@/app/store";
import { ArsEnsurance, ArsEnsurancePost, ArsEnsurancePut } from "@/app/(DashboardLayout)/types/Ars/ArsEnsurance/arsEnsurance";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const ArsEnsuranceModal = () => {
    const { showArsEnsuranceModal, handleCloseArsEnsuranceModal, createArsEnsurance, updateArsEnsurance, arsEnsuranceId, getArsEnsuranceDetailed, arsEnsuranceDetailed } = useMainStore();
    const formMethods = useForm<ArsEnsurance>();
    const { handleSubmit, reset } = formMethods;
    const btnClose = () => {
        handleCloseArsEnsuranceModal();
        reset();
    }
    
        const onSubmit = (data: ArsEnsurance) => {
        if (arsEnsuranceId) {
            const arsEnsuranceToUpdate: ArsEnsurancePut = {
                arsEnsuranceId: arsEnsuranceId,
                ensuranceName: data.ensuranceName,
                ensuranceDirection: data.ensuranceDirection,
                ensurancePhone: data.ensurancePhone,
                ensurancePhone2: data.ensurancePhone2,
                ensuranceFax: data.ensuranceFax,
                ensuranceEmail: data.ensuranceEmail,
                ensuranceSchedule: data.ensuranceSchedule,
                ensuranceUpdateDate: data.ensuranceUpdateDate,
            };
            updateArsEnsurance(arsEnsuranceToUpdate);
        } else {
            const arsEnsuranceToCreate: ArsEnsurancePost = {
                ensuranceName: data.ensuranceName,
                ensuranceDirection: data.ensuranceDirection,
                ensurancePhone: data.ensurancePhone,
                ensurancePhone2: data.ensurancePhone2,
                ensuranceFax: data.ensuranceFax,
                ensuranceEmail: data.ensuranceEmail,
                ensuranceSchedule: data.ensuranceSchedule,
                ensuranceUpdateDate: data.ensuranceUpdateDate,
            };
            createArsEnsurance(arsEnsuranceToCreate);
        }
        btnClose();
    }

    useEffect(() => {
        if (arsEnsuranceId) {
            getArsEnsuranceDetailed(arsEnsuranceId);
        }
    }, [arsEnsuranceId, getArsEnsuranceDetailed]);

    useEffect(() => {
        if (arsEnsuranceDetailed && arsEnsuranceId) {
            formMethods.setValue('ensuranceName', arsEnsuranceDetailed.ensuranceName);
            formMethods.setValue('ensuranceDirection', arsEnsuranceDetailed.ensuranceDirection);
            formMethods.setValue('ensurancePhone', arsEnsuranceDetailed.ensurancePhone);
            formMethods.setValue('ensurancePhone2', arsEnsuranceDetailed.ensurancePhone2);
            formMethods.setValue('ensuranceFax', arsEnsuranceDetailed.ensuranceFax);
            formMethods.setValue('ensuranceEmail', arsEnsuranceDetailed.ensuranceEmail);
            formMethods.setValue('ensuranceSchedule', arsEnsuranceDetailed.ensuranceSchedule);
            formMethods.setValue('ensuranceUpdateDate', new Date(arsEnsuranceDetailed.ensuranceUpdateDate));
        }
    }, [arsEnsuranceDetailed, arsEnsuranceId, formMethods.setValue]);

    return (
        <Dialog
            open={showArsEnsuranceModal}
            onClose={btnClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>{arsEnsuranceId ? 'Editar' : 'Agregar'} ARS</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <ArsEnsuranceForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{arsEnsuranceId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default ArsEnsuranceModal;