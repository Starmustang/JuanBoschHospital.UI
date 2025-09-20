import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { PatientPost } from "@/app/(DashboardLayout)/types/patient/patient";
import { useMainStore } from "@/app/store";
import PatientForm from "./patientForm";

const PatientModal = () => {    
    const {showPatientModal, handleClosePatientModal, createPatient} = useMainStore();
    const formMethods = useForm<PatientPost>();

    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleClosePatientModal();
    }
    const onSubmit = (data: PatientPost) => {
        createPatient(data);
        btnClose();
    }

    return (
        <>
        <Dialog 
        open={showPatientModal} 
        onClose={btnClose}
        fullWidth
        maxWidth="md"
        >
            <DialogTitle>Crear paciente</DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <FormProvider {...formMethods}>
                <PatientForm/>
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={btnClose} color="error">Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Guardar</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default PatientModal;