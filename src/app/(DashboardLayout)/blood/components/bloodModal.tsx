'use client'
import { FormProvider, useForm } from "react-hook-form";
import { blood } from "../../types/Blood/blood";
import { useMainStore } from "@/app/store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import BloodForm from "./bloodForm";
const BloodModal = () => {
    const formMethods = useForm<blood>();
    const { handleSubmit, reset } = formMethods;
    const {showbloodModal, handleCloseBloodModal,} = useMainStore();
    
    const onSubmit = (data: blood) => {
        console.log(data);
        btnClose();
    }
    const btnClose = () => {
        reset();
        handleCloseBloodModal();
    }
    return (
        <Dialog
        open={showbloodModal}
        onClose={btnClose}
        fullWidth
        maxWidth="md"
        >
            <DialogTitle>Sangre</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                <BloodForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
export default BloodModal;