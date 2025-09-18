import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormProvider } from "react-hook-form";
import DoctorEnsuranceForm from "./doctorEnsuranceForm";
import { useForm } from "react-hook-form";
import { useMainStore } from "@/app/store";
import { DoctorEnsurancePost } from "@/app/(DashboardLayout)/types/Doctor/DoctorEnsurance";

const DoctorEnsuranceModal = () => {
    const { showDoctorEnsuranceModal, handleCloseDoctorEnsuranceModal } = useMainStore();
    const formMethods = useForm<DoctorEnsurancePost>();
    const { handleSubmit, reset } = formMethods;

    const onSubmit = (data: DoctorEnsurancePost) => {
        console.log(data);
        reset();
        handleCloseDoctorEnsuranceModal();
    }

    const handleCancel = () => {
        reset();
        handleCloseDoctorEnsuranceModal();
    }


    return (
        <Dialog
        open={showDoctorEnsuranceModal}
        onClose={handleCloseDoctorEnsuranceModal}
        >
            <DialogTitle>Seguro de doctor</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <DoctorEnsuranceForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={() => handleCancel()}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={() => handleSubmit(onSubmit)}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DoctorEnsuranceModal;