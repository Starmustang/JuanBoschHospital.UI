import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import MedicRecordsForm from "./medicRecordsForm";
import { useMainStore } from "@/app/store";
import { FormProvider, useForm } from "react-hook-form";
import { MedicRecords, MedicRecordsPost, MedicRecordsPut } from "@/app/(DashboardLayout)/types/medic/medicRecords";
import { useEffect } from "react";

const MedicRecordsModal = () => {
    const { showMedicRecordsModal, handleCloseMedicRecordsModal, medicRecordId, getMedicRecordDetailed, medicRecordDetailed, createMedicRecord, updateMedicRecord } = useMainStore();
    const formMethods = useForm<MedicRecords>();
    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleCloseMedicRecordsModal();
    }

    const onSubmit = (data: MedicRecords) => {
        const recordData: MedicRecordsPost = {
            patientId: data.patientId,
            doctorId: data.doctorId,
            followUpMedicRecord: data.followUpMedicRecord,
            signsMedicRecord: data.signsMedicRecord,
        };

        if (medicRecordId) {
            const recordToUpdate: MedicRecordsPut = {
                recordId: medicRecordId,
                ...recordData,
            };
            updateMedicRecord(recordToUpdate);
        } else {
            createMedicRecord(recordData);
        }
        btnClose();
    }

    useEffect(() => {
        if (medicRecordId) {
            getMedicRecordDetailed(medicRecordId);
        }
    }, [medicRecordId, getMedicRecordDetailed]);

    useEffect(() => {
        if (medicRecordDetailed && medicRecordId) {
            setValue('patientId', medicRecordDetailed.patientId);
            setValue('doctorId', medicRecordDetailed.doctorId);
            setValue('followUpMedicRecord', medicRecordDetailed.followUpMedicRecord);
            setValue('signsMedicRecord', medicRecordDetailed.signsMedicRecord);
        }
    }, [medicRecordDetailed, medicRecordId, setValue]);

    return (
        <Dialog
            open={showMedicRecordsModal}
            onClose={btnClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{medicRecordId ? 'Editar' : 'Agregar'} Registro Medico</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <MedicRecordsForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{medicRecordId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default MedicRecordsModal;