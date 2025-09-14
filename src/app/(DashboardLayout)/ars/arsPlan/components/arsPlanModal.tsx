"use client";
import { useMainStore } from "@/app/store";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { FormProvider } from "react-hook-form";
import ArsPlanForm from "./arsPlanForm";
import { useForm } from "react-hook-form";
import { ArsPlan } from "@/app/(DashboardLayout)/types/Ars/ArsPlan/arsPlan";
const ArsPlanModal = () => {
    const {showArsPlanModal, handleCloseArsPlanModal} = useMainStore();
    const formMethods = useForm<ArsPlan>();
    const { handleSubmit, reset } = formMethods;
    
    const btnClose = () => {
        reset();
        handleCloseArsPlanModal();
    }
    const onSubmit = (data: ArsPlan) => {
        console.log(data);
        btnClose();
    }
    return (
       <Dialog
       open={showArsPlanModal}
       onClose={btnClose}
       >
       <DialogTitle>Plan de salud</DialogTitle>
       <DialogContent>
        <FormProvider {...formMethods}>
        <ArsPlanForm />
        </FormProvider>
       </DialogContent>
       <DialogActions>
       <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
       <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>Guardar</Button>
       </DialogActions>
       </Dialog>
    );
}
export default ArsPlanModal;