"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import DoctorAddressForm from "./doctorAddressForm";
import { useForm, FormProvider } from "react-hook-form";
import { DoctorAddress, DoctorAddressPost, DoctorAddressPut } from "@/app/(DashboardLayout)/types/Address/doctorAddress/doctorAddress";
import { useEffect } from "react";

const DoctorAddressModal = () => {
        const { showDoctorAddressModal, handleCloseDoctorAddressModal, getSectorList, createDoctorAddress, updateDoctorAddress, doctorAddressId, getDoctorAddressDetailed, doctorAddressDetailed } = useMainStore();
        const formMethods = useForm<DoctorAddress>({ 
        defaultValues: { 
            doctorHouseNumber: '', 
            doctorStreet: '', 
            sectorId: 0 
        } 
    });
    const { handleSubmit, reset } = formMethods;

    const onSubmit = (data: DoctorAddress) => {
        if (doctorAddressId) {
            const doctorAddressToUpdate: DoctorAddressPut = {
                doctorAddressId: doctorAddressId,
                doctorHouseNumber: data.doctorHouseNumber,
                doctorStreet: data.doctorStreet,
                sectorId: data.sectorId,
            };
            updateDoctorAddress(doctorAddressToUpdate);
        } else {
            const doctorAddressToCreate: DoctorAddressPost = {
                doctorHouseNumber: data.doctorHouseNumber,
                doctorStreet: data.doctorStreet,
                sectorId: data.sectorId,
            };
            createDoctorAddress(doctorAddressToCreate);
        }
        handleClose();
    };

    const handleClose = () => {
        handleCloseDoctorAddressModal();
        reset();
    };

    useEffect(() => {
        getSectorList();
    }, [getSectorList]);

    useEffect(() => {
        if (doctorAddressId) {
            getDoctorAddressDetailed(doctorAddressId);
        }
    }, [doctorAddressId, getDoctorAddressDetailed]);

    useEffect(() => {
        if (doctorAddressDetailed && doctorAddressId) {
            formMethods.setValue('doctorHouseNumber', doctorAddressDetailed.doctorHouseNumber);
            formMethods.setValue('doctorStreet', doctorAddressDetailed.doctorStreet);
            formMethods.setValue('sectorId', doctorAddressDetailed.sectorId);
        }
    }, [doctorAddressDetailed, doctorAddressId, formMethods.setValue]);

    return (
        <Dialog
            open={showDoctorAddressModal}
            onClose={handleClose}
        >
            <DialogTitle>{doctorAddressId ? 'Editar' : 'Agregar'} Dirección de Doctor</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <DoctorAddressForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained">Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">{doctorAddressId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DoctorAddressModal;