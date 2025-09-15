"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import DoctorAddressForm from "./doctorAddressForm";
import { useForm, FormProvider } from "react-hook-form";
import { DoctorAddress } from "@/app/(DashboardLayout)/types/Address/doctorAddress/doctorAddress";

const DoctorAddressModal = () => {
    const { showDoctorAddressModal, handleCloseDoctorAddressModal } = useMainStore();
    const formMethods = useForm<DoctorAddress>();
    const { handleSubmit, reset } = formMethods;

    const onSubmit = (data: DoctorAddress) => {
        console.log(data);
        handleCloseDoctorAddressModal();
        reset();
    };

    const handleClose = () => {
        handleCloseDoctorAddressModal();
        reset();
    };

    return (
        <Dialog
            open={showDoctorAddressModal}
            onClose={handleClose}
        >
            <DialogTitle>Agregar Dirección de Doctor</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <DoctorAddressForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained">Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DoctorAddressModal;