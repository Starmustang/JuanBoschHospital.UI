import { PatientDirectionPost } from "@/app/(DashboardLayout)/types/patient/patientDIrection";
import { useMainStore } from "@/app/store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import PatientDirectionForm from "./patientDirectionForm";

const PatientDirectionModal = () => {
    const {showPatientDirectionModal, handleClosePatientDirectionModal} = useMainStore();
    const formMethods = useForm<PatientDirectionPost>();
    const {reset, handleSubmit} = formMethods;
    const onSubmit = (data: PatientDirectionPost) => {
        console.log(data);
        handleClose();
    };
    const handleClose = () => {
        handleClosePatientDirectionModal();
        reset();
    };
    return (
       <Dialog
       open={showPatientDirectionModal}
       onClose={handleClose}
       >
        <DialogTitle>Registrar direccion</DialogTitle>
        <DialogContent>
            <FormProvider {...formMethods}>
            <PatientDirectionForm/>
            </FormProvider>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmit(onSubmit)}>Guardar</Button>
        </DialogActions>
       </Dialog>
    );
};

export default PatientDirectionModal;