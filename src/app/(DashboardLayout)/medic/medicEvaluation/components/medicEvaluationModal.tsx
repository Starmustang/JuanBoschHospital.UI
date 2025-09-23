"use client";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import { useForm, FormProvider } from "react-hook-form";
import { MedicEvaluations, MedicEvaluationsPost, MedicEvaluationsPut } from "@/app/(DashboardLayout)/types/medic/medicEvaluations";
import MedicEvaluationForm from "./medicEvaluationForm";
import { useEffect } from "react";

const MedicEvaluationModal = () => {
    const { showMedicEvaluationModal, handleCloseMedicEvaluationModal, medicEvaluationId, getMedicEvaluationDetailed, medicEvaluationDetailed, createMedicEvaluation, updateMedicEvaluation } = useMainStore();
    const formMethods = useForm<MedicEvaluations>();
    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleCloseMedicEvaluationModal();
    }

    const onSubmit = (data: MedicEvaluations) => {
        const evaluationData: Omit<MedicEvaluations, 'medicEvaluationId'> = {
            weightEva: data.weightEva,
            presurreEva: data.presurreEva,
            breathingEva: data.breathingEva,
            heartRateEva: data.heartRateEva,
            otherInfoEva: data.otherInfoEva,
            heightEva: data.heightEva,
            previousSickNessEva: data.previousSickNessEva
        };

        if (medicEvaluationId) {
            const evaluationToUpdate: MedicEvaluationsPut = {
                medicEvaluationId: medicEvaluationId,
                ...evaluationData,
            };
            updateMedicEvaluation(evaluationToUpdate);
        } else {
            const evaluationToCreate: MedicEvaluationsPost = evaluationData;
            createMedicEvaluation(evaluationToCreate);
        }
        btnClose();
    }

    useEffect(() => {
        if (medicEvaluationId) {
            getMedicEvaluationDetailed(medicEvaluationId);
        }
    }, [medicEvaluationId, getMedicEvaluationDetailed]);

    useEffect(() => {
        if (medicEvaluationDetailed && medicEvaluationId) {
            setValue('weightEva', medicEvaluationDetailed.weightEva);
            setValue('presurreEva', medicEvaluationDetailed.presurreEva);
            setValue('breathingEva', medicEvaluationDetailed.breathingEva);
            setValue('heartRateEva', medicEvaluationDetailed.heartRateEva);
            setValue('otherInfoEva', medicEvaluationDetailed.otherInfoEva);
            setValue('heightEva', medicEvaluationDetailed.heightEva);
            setValue('previousSickNessEva', medicEvaluationDetailed.previousSickNessEva);
        }
    }, [medicEvaluationDetailed, medicEvaluationId, setValue]);

    return (
        <Dialog
            open={showMedicEvaluationModal}
            onClose={btnClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>{medicEvaluationId ? 'Editar' : 'Agregar'} Evaluación Médica</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <MedicEvaluationForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{medicEvaluationId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default MedicEvaluationModal;