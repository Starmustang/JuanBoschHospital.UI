"use client";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import { useForm, FormProvider } from "react-hook-form";
import { MedicEvaluations } from "@/app/(DashboardLayout)/types/medic/medicEvaluations";
import MedicEvaluationForm from "./medicEvaluationForm";

const MedicEvaluationModal = () => {
    const { showMedicEvaluationModal, handleCloseMedicEvaluationModal } = useMainStore();
    const formMethods = useForm<MedicEvaluations>();
    const { handleSubmit, reset } = formMethods;

    const onSubmit = (data: MedicEvaluations) => {
        console.log(data);
        handleCloseMedicEvaluationModal();
        reset();
    };

    const handleClose = () => {
        handleCloseMedicEvaluationModal();
        reset();
    };

    return (
        <Dialog
            open={showMedicEvaluationModal}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>Evaluar Médico</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <MedicEvaluationForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained">Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
export default MedicEvaluationModal;