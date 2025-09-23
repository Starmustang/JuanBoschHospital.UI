"use client";
import { useMainStore } from "@/app/store";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { FormProvider } from "react-hook-form";
import ArsPlanForm from "./arsPlanForm";
import { useForm } from "react-hook-form";
import { ArsPlan, ArsPlanPost, ArsPlanPut } from "@/app/(DashboardLayout)/types/Ars/ArsPlan/arsPlan";
import { useEffect } from "react";
const ArsPlanModal = () => {
    const { showArsPlanModal, handleCloseArsPlanModal, getArsEnsuranceList, arsPlanId, getArsPlanDetailed, arsPlanDetailed, createArsPlan, updateArsPlan,  } = useMainStore();
    const formMethods = useForm<ArsPlan>({
        defaultValues: {
            afiliationNumberArs: '',
            arsPlansName: '',
            coveragePlanArs: '',
            internationalCoverage: false,
            isPlanActive: false,
            maxLimitArs: '',
            arsEnsuranceId: 0,
        }
    });
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        getArsEnsuranceList();
    }, [getArsEnsuranceList]);

    const btnClose = () => {
        reset();
        handleCloseArsPlanModal();
    }

    const onSubmit = (data: ArsPlan) => {
        const planData = {
            afiliationNumberArs: data.afiliationNumberArs,
            arsPlansName: data.arsPlansName,
            coveragePlanArs: data.coveragePlanArs,
            internationalCoverage: data.internationalCoverage,
            isPlanActive: data.isPlanActive,
            maxLimitArs: data.maxLimitArs,
            arsEnsuranceId: data.arsEnsuranceId,
        };

        if (arsPlanId) {
            const planToUpdate: ArsPlanPut = {
                arsPlansId: arsPlanId,
                ...planData,
            };
            updateArsPlan(planToUpdate);
        } else {
            const planToCreate: ArsPlanPost = planData;
            createArsPlan(planToCreate);
        }
        btnClose();
    }

    useEffect(() => {
        if (arsPlanId) {
            getArsPlanDetailed(arsPlanId);
        }
    }, [arsPlanId, getArsPlanDetailed]);

    useEffect(() => {
        if (arsPlanDetailed && arsPlanId) {
            formMethods.setValue('afiliationNumberArs', arsPlanDetailed.afiliationNumberArs);
            formMethods.setValue('arsPlansName', arsPlanDetailed.arsPlansName);
            formMethods.setValue('coveragePlanArs', arsPlanDetailed.coveragePlanArs);
            formMethods.setValue('internationalCoverage', arsPlanDetailed.internationalCoverage);
            formMethods.setValue('isPlanActive', arsPlanDetailed.isPlanActive);
            formMethods.setValue('maxLimitArs', arsPlanDetailed.maxLimitArs);
            formMethods.setValue('arsEnsuranceId', arsPlanDetailed.arsEnsuranceId);
        }
    }, [arsPlanDetailed, arsPlanId, formMethods.setValue]);

    return (
        <Dialog
            open={showArsPlanModal}
            onClose={btnClose}
        >
            <DialogTitle>{arsPlanId ? 'Editar' : 'Agregar'} Plan de Salud</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <ArsPlanForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{arsPlanId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default ArsPlanModal;