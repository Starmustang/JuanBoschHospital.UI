import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { Patient } from "@/app/(DashboardLayout)/types/patient/patient";

const PatientModal = () => {
    const formMethods = useForm<Patient>();
    return (
        <>
        <Dialog open={false}>
            <DialogTitle>Crear paciente</DialogTitle>
            <DialogContent>
                wow
            </DialogContent>
        </Dialog>
        </>
    );
};

export default PatientModal;