import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import MedicRecordsForm from "./medicRecordsForm";
import { useMainStore } from "@/app/store";
import { FormProvider, useForm } from "react-hook-form";
import { MedicRecords } from "@/app/(DashboardLayout)/types/medic/medicRecords";


const MedicRecordsModal = () => {
    const { showMedicRecordsModal, handleCloseMedicRecordsModal } = useMainStore();
    const formMethods = useForm<MedicRecords>();
    const { handleSubmit, reset } = formMethods;
    
    const onSubmit = (data: MedicRecords) => {
        console.log(data);
        reset();
        handleCloseMedicRecordsModal();
    };

    const handleClose = () => {
        handleCloseMedicRecordsModal();
        reset();
    };

    return (
        <Dialog 
        open={showMedicRecordsModal}
        onClose={() => handleClose()}
        >
            <DialogTitle>Registros medicos</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <MedicRecordsForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancelar</Button>
                <Button onClick={() => handleSubmit(onSubmit)}>Guardar</Button>
            </DialogActions>
        </Dialog>   
    )
}
export default MedicRecordsModal;