import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Patient, PatientPost, PatientPut } from "@/app/(DashboardLayout)/types/patient/patient";
import { useMainStore } from "@/app/store";
import PatientForm from "./patientForm";
import { useEffect } from "react";

const PatientModal = () => {
    const { showPatientModal, handleClosePatientModal, patientId, getPatientDetailed, patientDetailed, createPatient, updatePatient } = useMainStore();
    const formMethods = useForm<Patient>();
    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleClosePatientModal();
    }

    const onSubmit = (data: Patient) => {
        const patientData: PatientPost = {
            patientName: data.patientName,
            patientLastName: data.patientLastName!,
            patientIdCard: data.patientIdCard!,
            patientPassport: data.patientPassport!,
            patientBirthDate: data.patientBirthDate?.toString()!,
            patientGender: data.patientGender!,
            patientEmail: data.patientEmail!,
            patientPhone: data.patientPhone!,
            arsPlansId: data.arsPlansId!,
            addressId: data.addressId!,
            patientEmergencieContact: data.patientEmergencieContact!,
            patientFirstRecord: data.patientFisRecord!,
            bloodId: data.bloodId!,
            medicRecordId: data.medicRecordId!,
            patientDirectionId: data.patientDirectionId!,
            patientDoctorId: data.patientDoctorId!,
            dateMedicId: data.dateMedicId!,
        };

        if (patientId) {
            const patientToUpdate: PatientPut = {
                patientId: patientId,
                ...patientData,
            };
            updatePatient(patientToUpdate);
        } else {
            createPatient(patientData);
        }
        btnClose();
    }

    useEffect(() => {
        if (patientId) {
            getPatientDetailed(patientId);
        }
    }, [patientId, getPatientDetailed]);

    useEffect(() => {
        if (patientDetailed && patientId) {
            setValue('patientName', patientDetailed.patientName);
            setValue('patientLastName', patientDetailed.patientLastName);
            setValue('patientIdCard', patientDetailed.patientIdCard);
            setValue('patientPassport', patientDetailed.patientPassport);
            setValue('patientBirthDate', patientDetailed.patientBirthDate);
            setValue('patientGender', patientDetailed.patientGender);
            setValue('patientEmail', patientDetailed.patientEmail);
            setValue('patientPhone', patientDetailed.patientPhone);
            setValue('arsPlansId', patientDetailed.arsPlansId);
            setValue('addressId', patientDetailed.addressId);
            setValue('patientEmergencieContact', patientDetailed.patientEmergencieContact);
            setValue('patientFisRecord', patientDetailed.patientFisRecord);
            setValue('bloodId', patientDetailed.bloodId);
            setValue('medicRecordId', patientDetailed.medicRecordId);
            setValue('patientDirectionId', patientDetailed.patientDirectionId);
            setValue('patientDoctorId', patientDetailed.patientDoctorId);
            setValue('dateMedicId', patientDetailed.dateMedicId);
        }
    }, [patientDetailed, patientId, setValue]);

    return (
        <Dialog
            open={showPatientModal}
            onClose={btnClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>{patientId ? 'Editar' : 'Agregar'} Paciente</DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <FormProvider {...formMethods}>
                    <PatientForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{patientId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PatientModal;