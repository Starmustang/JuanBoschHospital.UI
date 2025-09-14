import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DateDoctorForm from "./dateDoctorForm";
import { useMainStore } from "@/app/store";
import { FormProvider, useForm } from "react-hook-form";
import { DateDoctor } from "@/app/(DashboardLayout)/types/Dates/DateDoctor/dateDoctor";

const DateDoctorModal = () => {
    const {showDateDoctorModal, handleCloseDateDoctorModal} = useMainStore(state => state);
    const formMethods = useForm<DateDoctor>();
    const {handleSubmit, reset} = formMethods;
    const onSubmit = (data: DateDoctor) => {
        console.log(data);
        reset();
        handleCloseDateDoctorModal();
    }
    const btnClose = () => {
        reset();
        handleCloseDateDoctorModal();
    }
    

    return (
        <Dialog 
        open={showDateDoctorModal}
        onClose={btnClose}
        fullWidth
        maxWidth="md"
        >
        <DialogTitle>Citas medicas</DialogTitle>
        <DialogContent>
            <FormProvider {...formMethods}>
            <DateDoctorForm />
            </FormProvider>
        </DialogContent>
        <DialogActions>
            <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
            <Button color="primary" variant="contained" onClick={() => handleSubmit(onSubmit)}>Guardar</Button>
        </DialogActions>
        </Dialog>
    )
}
export default DateDoctorModal;