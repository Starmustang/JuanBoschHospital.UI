import { useForm } from "react-hook-form";
import { Doctor } from "../../types/Doctor/Doctor";
import { useMainStore } from "@/app/store";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { FormProvider } from "react-hook-form";
import DoctorForm from "./doctorForm";

const DoctorModal = () => {
    const { showDoctorModal, handleCloseDoctorModal } = useMainStore();
    const formMethods = useForm<Doctor>();
    const { handleSubmit, reset } = formMethods;

    const onSubmit = (data: Doctor) => {
        console.log(data);
        handleCloseDoctorModal();
        reset();
    };

    const handleClose = () => {
        handleCloseDoctorModal();
        reset();
    };

    return (
        <Dialog
            open={showDoctorModal}
            onClose={handleClose}
        >
            <DialogTitle>Doctor</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <DoctorForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained">Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DoctorModal;