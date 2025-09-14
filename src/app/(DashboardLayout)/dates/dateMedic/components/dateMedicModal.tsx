import { DateMedic } from "@/app/(DashboardLayout)/types/Dates/DateMedic/dateMedic";
import { useMainStore } from "@/app/store";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import DateMedicForm from "./dateMedicForm";

const DateMedicModal = () => {
    const formMethods = useForm<DateMedic>();
    const { handleSubmit, reset } = formMethods;
    const {showDateMedicModal, handleCloseDateMedicModal} = useMainStore(state => state);
    
    const btnClose = () => {
        reset();
        handleCloseDateMedicModal();
    }
    const onSubmit = (data: DateMedic) => {
        console.log(data);
        btnClose();
    }
    return (
       <Dialog 
       open={showDateMedicModal} 
       onClose={btnClose}
       fullWidth
       maxWidth="md"
       >
       <DialogTitle>Fecha de medicion</DialogTitle>
       <DialogContent>
        <FormProvider {...formMethods}>
        <DateMedicForm />
        </FormProvider>
       </DialogContent>
       <DialogActions>
       <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
       <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>Guardar</Button>
       </DialogActions>
       </Dialog>
    );
}
export default DateMedicModal;