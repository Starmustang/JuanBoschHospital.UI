import { DateMedic, DateMedicPost, DateMedicPut } from "@/app/(DashboardLayout)/types/Dates/DateMedic/dateMedic";
import { useEffect } from "react";
import { useMainStore } from "@/app/store";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import DateMedicForm from "./dateMedicForm";

const DateMedicModal = () => {
    const formMethods = useForm<DateMedic>();
    const { handleSubmit, reset } = formMethods;
    const { showDateMedicModal, handleCloseDateMedicModal, createDateMedic, updateDateMedic, dateMedicId, getDateMedicDetailed, dateMedicDetailed } = useMainStore();
    
    const btnClose = () => {
        reset();
        handleCloseDateMedicModal();
    }
        const onSubmit = (data: DateMedic) => {
        if (dateMedicId) {
            const dateMedicToUpdate: DateMedicPut = {
                dateMedicId: dateMedicId,
                patientId: data.patientId,
                doctorId: data.doctorId,
                dateMedicDate: data.dateMedicDate,
                hospitalMedicDate: data.hospitalMedicDate,
                consultationTypeId: data.consultationTypeId,
                dateDoctorId: data.dateDoctorId,
            };
            updateDateMedic(dateMedicToUpdate);
        } else {
            const dateMedicToCreate: DateMedicPost = {
                patientId: data.patientId,
                doctorId: data.doctorId,
                dateMedicDate: data.dateMedicDate,
                hospitalMedicDate: data.hospitalMedicDate,
                consultationTypeId: data.consultationTypeId,
                dateDoctorId: data.dateDoctorId,
            };
            createDateMedic(dateMedicToCreate);
        }
        btnClose();
    }

    useEffect(() => {
        if (dateMedicId) {
            getDateMedicDetailed(dateMedicId);
        }
    }, [dateMedicId, getDateMedicDetailed]);

    useEffect(() => {
        if (dateMedicDetailed && dateMedicId) {
            formMethods.setValue('patientId', dateMedicDetailed.patientId);
            formMethods.setValue('doctorId', dateMedicDetailed.doctorId);
            formMethods.setValue('dateMedicDate', new Date(new Date(dateMedicDetailed.dateMedicDate).toISOString().split('T')[0]));
            formMethods.setValue('hospitalMedicDate', new Date(new Date(dateMedicDetailed.hospitalMedicDate).toISOString().split('T')[0]));
            formMethods.setValue('consultationTypeId', dateMedicDetailed.consultationTypeId);
            formMethods.setValue('dateDoctorId', dateMedicDetailed.dateDoctorId);
        }
    }, [dateMedicDetailed, dateMedicId, formMethods.setValue]);

    return (
       <Dialog 
       open={showDateMedicModal} 
       onClose={btnClose}
       fullWidth
       maxWidth="md"
       >
       <DialogTitle>{dateMedicId ? 'Editar' : 'Agregar'} Cita Médica</DialogTitle>
       <DialogContent>
        <FormProvider {...formMethods}>
        <DateMedicForm />
        </FormProvider>
       </DialogContent>
       <DialogActions>
       <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
       <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{dateMedicId ? 'Editar' : 'Guardar'}</Button>
       </DialogActions>
       </Dialog>
    );
}
export default DateMedicModal;