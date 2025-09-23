import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import DoctorEnsuranceForm from "./doctorEnsuranceForm";
import { useMainStore } from "@/app/store";
import { DoctorEnsurance, DoctorEnsurancePost, DoctorEnsurancePut } from "@/app/(DashboardLayout)/types/Doctor/DoctorEnsurance";
import { useEffect } from "react";

const DoctorEnsuranceModal = () => {
    const { showDoctorEnsuranceModal, handleCloseDoctorEnsuranceModal, doctorEnsuranceId, getDoctorEnsuranceDetailed, doctorEnsuranceDetailed, createDoctorEnsurance, updateDoctorEnsurance } = useMainStore();
    const formMethods = useForm<DoctorEnsurance>();
    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleCloseDoctorEnsuranceModal();
    }

    const onSubmit = (data: DoctorEnsurance) => {
        const ensuranceData: DoctorEnsurancePost = {
            doctorId: data.doctorId,
            arsEnsuranceId: data.arsEnsuranceId,
            medicCode: data.medicCode,
        };

        if (doctorEnsuranceId) {
            const ensuranceToUpdate: DoctorEnsurancePut = {
                doctorEnsuranceId: doctorEnsuranceId,
                ...ensuranceData,
            };
            updateDoctorEnsurance(ensuranceToUpdate);
        } else {
            createDoctorEnsurance(ensuranceData);
        }
        btnClose();
    }

    useEffect(() => {
        if (doctorEnsuranceId) {
            getDoctorEnsuranceDetailed(doctorEnsuranceId);
        }
    }, [doctorEnsuranceId, getDoctorEnsuranceDetailed]);

    useEffect(() => {
        if (doctorEnsuranceDetailed && doctorEnsuranceId) {
            setValue('doctorId', doctorEnsuranceDetailed.doctorId);
            setValue('arsEnsuranceId', doctorEnsuranceDetailed.arsEnsuranceId);
            setValue('medicCode', doctorEnsuranceDetailed.medicCode);
        }
    }, [doctorEnsuranceDetailed, doctorEnsuranceId, setValue]);

    return (
        <Dialog
            open={showDoctorEnsuranceModal}
            onClose={btnClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{doctorEnsuranceId ? 'Editar' : 'Agregar'} Seguro de Doctor</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <DoctorEnsuranceForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{doctorEnsuranceId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DoctorEnsuranceModal;