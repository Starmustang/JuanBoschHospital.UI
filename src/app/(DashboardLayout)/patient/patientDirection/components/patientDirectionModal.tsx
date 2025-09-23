import { PatientDirection, PatientDirectionPost, PatientDirectionPut } from "@/app/(DashboardLayout)/types/patient/patientDIrection";
import { useMainStore } from "@/app/store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import PatientDirectionForm from "./patientDirectionForm";
import { useEffect } from "react";

const PatientDirectionModal = () => {
    const { showPatientDirectionModal, handleClosePatientDirectionModal, addressId, getPatientDirectionDetailed, patientDirectionDetailed, createPatientDirection, updatePatientDirection } = useMainStore();
    const formMethods = useForm<PatientDirection>();
    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleClosePatientDirectionModal();
    }

    const onSubmit = (data: PatientDirection) => {
        const directionData: PatientDirectionPost = {
            houseNumber: data.houseNumber,
            houseStreet: data.houseStreet,
            sectorId: data.sectorId,
        };

        if (addressId) {
            const directionToUpdate: PatientDirectionPut = {
                addressId: addressId,
                ...directionData,
            };
            updatePatientDirection(directionToUpdate);
        } else {
            createPatientDirection(directionData);
        }
        btnClose();
    }

    useEffect(() => {
        if (addressId) {
            getPatientDirectionDetailed(addressId);
        }
    }, [addressId, getPatientDirectionDetailed]);

    useEffect(() => {
        if (patientDirectionDetailed && addressId) {
            setValue('houseNumber', patientDirectionDetailed.houseNumber);
            setValue('houseStreet', patientDirectionDetailed.houseStreet);
            setValue('sectorId', patientDirectionDetailed.sectorId);
        }
    }, [patientDirectionDetailed, addressId, setValue]);

    return (
        <Dialog
            open={showPatientDirectionModal}
            onClose={btnClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{addressId ? 'Editar' : 'Agregar'} Dirección de Paciente</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <PatientDirectionForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{addressId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PatientDirectionModal;