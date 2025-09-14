import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ArsEnsuranceForm from "./arsEnsuranceForm";
import { useMainStore } from "@/app/store";
import { ArsEnsurance } from "@/app/(DashboardLayout)/types/Ars/ArsEnsurance/arsEnsurance";
import { FormProvider, useForm } from "react-hook-form";

const ArsEnsuranceModal = () => {
    const {showArsEnsuranceModal, handleCloseArsEnsuranceModal} = useMainStore();
    const formMethods = useForm<ArsEnsurance>();
    const { handleSubmit, reset } = formMethods;
    const btnClose = () => {
        handleCloseArsEnsuranceModal();
    }
    
    const onSubmit = (data: ArsEnsurance) => {
        console.log(data);
        btnClose();
    }
    return (
        <Dialog
        open={showArsEnsuranceModal}
        onClose={btnClose}
        >
        <DialogTitle>Aseguradora</DialogTitle>
        <DialogContent>
                  <FormProvider {...formMethods}>
            <ArsEnsuranceForm />
         </FormProvider>
        </DialogContent>
        <DialogActions>
        <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
        <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>Guardar</Button>
        </DialogActions>
        </Dialog>
    );
}
export default ArsEnsuranceModal;