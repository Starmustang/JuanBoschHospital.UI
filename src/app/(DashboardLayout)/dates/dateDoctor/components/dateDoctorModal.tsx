import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DateDoctorForm from "./dateDoctorForm";
import { useMainStore } from "@/app/store";
import { FormProvider, useForm } from "react-hook-form";
import { DateDoctor, DateDoctorPost, DateDoctorPut } from "@/app/(DashboardLayout)/types/Dates/DateDoctor/dateDoctor";
import { useEffect } from "react";

const DateDoctorModal = () => {
    const { showDateDoctorModal, handleCloseDateDoctorModal, dateDoctorId, getDateDoctorDetailed, dateDoctorDetailed, createDateDoctor, updateDateDoctor } = useMainStore();
    const formMethods = useForm<DateDoctor>();
    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleCloseDateDoctorModal();
    }

    const onSubmit = (data: DateDoctor) => {
        const dateData: Omit<DateDoctor, 'dateDoctorId'> = {
            dateDoctorSintoms: data.dateDoctorSintoms,
            dateDoctorIndicatedAnalisis: data.dateDoctorIndicatedAnalisis,
            dateDoctorTreatment: data.dateDoctorTreatment,
            dateDoctorNotes: data.dateDoctorNotes,
            dateDoctorNextDate: data.dateDoctorNextDate,
            medicEvaluationId: data.medicEvaluationId
        };

        if (dateDoctorId) {
            const dateToUpdate: DateDoctorPut = {
                dateDoctorId: dateDoctorId,
                ...dateData,
            };
            updateDateDoctor(dateToUpdate);
        } else {
            const dateToCreate: DateDoctorPost = dateData;
            createDateDoctor(dateToCreate);
        }
        btnClose();
    }

    useEffect(() => {
        if (dateDoctorId) {
            getDateDoctorDetailed(dateDoctorId);
        }
    }, [dateDoctorId, getDateDoctorDetailed]);

    useEffect(() => {
        if (dateDoctorDetailed && dateDoctorId) {
            setValue('dateDoctorSintoms', dateDoctorDetailed.dateDoctorSintoms);
            setValue('dateDoctorIndicatedAnalisis', dateDoctorDetailed.dateDoctorIndicatedAnalisis);
            setValue('dateDoctorTreatment', dateDoctorDetailed.dateDoctorTreatment);
            setValue('dateDoctorNotes', dateDoctorDetailed.dateDoctorNotes);
            setValue('dateDoctorNextDate', new Date(dateDoctorDetailed.dateDoctorNextDate));
            setValue('medicEvaluationId', dateDoctorDetailed.medicEvaluationId);
        }
    }, [dateDoctorDetailed, dateDoctorId, setValue]);

    return (
        <Dialog
            open={showDateDoctorModal}
            onClose={btnClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>{dateDoctorId ? 'Editar' : 'Agregar'} Cita Médica</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <DateDoctorForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{dateDoctorId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DateDoctorModal;