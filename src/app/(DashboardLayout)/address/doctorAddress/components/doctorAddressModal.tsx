"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import DoctorAddressForm from "./doctorAddressForm";
import { useForm, FormProvider } from "react-hook-form";
import { DoctorAddress, DoctorAddressPost, DoctorAddressPut } from "@/app/(DashboardLayout)/types/Address/doctorAddress/doctorAddress";
import { useEffect } from "react";

const DoctorAddressModal = () => {
            const {
        showDoctorAddressModal, handleCloseDoctorAddressModal, getSectorList, createDoctorAddress, updateDoctorAddress, 
        doctorAddressId, getDoctorAddressDetailed, doctorAddressDetailed, getCountryList, getProvinceList, getMunicipalityList,
        countryList, provinceList, municipalityList, sectorList
    } = useMainStore();
            const formMethods = useForm<DoctorAddress>({ 
        defaultValues: { 
            doctorHouseNumber: '', 
            doctorStreet: '', 
            sectorId: 0,
            countryId: 0,
            provinceId: 0,
            municipalityId: 0
        } 
    });
        const { handleSubmit, reset, setValue } = formMethods;

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
        getCountryList();
        getProvinceList();
        getMunicipalityList();
        getSectorList();
    }, [getCountryList, getProvinceList, getMunicipalityList, getSectorList]);

    useEffect(() => {
        if (doctorAddressId) {
            getDoctorAddressDetailed(doctorAddressId);
        }
    }, [doctorAddressId, getDoctorAddressDetailed]);

    useEffect(() => {
        // Wait until all data is loaded before setting form values for an edit
        if (doctorAddressDetailed && doctorAddressId && countryList.length > 0 && provinceList.length > 0 && municipalityList.length > 0 && sectorList.length > 0) {
            const sector = sectorList.find(s => s.sectorId === doctorAddressDetailed.sectorId);
            if (sector) {
                const municipality = municipalityList.find(m => m.municipalityId === sector.municipalityId);
                if (municipality) {
                    const province = provinceList.find(p => p.provinceId === municipality.provinceId);
                    if (province) {
                        setValue('countryId', province.countryId);
                        setValue('provinceId', province.provinceId);
                        setValue('municipalityId', municipality.municipalityId);
                        setValue('sectorId', sector.sectorId);
                        setValue('doctorHouseNumber', doctorAddressDetailed.doctorHouseNumber);
                        setValue('doctorStreet', doctorAddressDetailed.doctorStreet);
                    }
                }
            }
        }
    }, [doctorAddressDetailed, doctorAddressId, countryList, provinceList, municipalityList, sectorList, setValue]);

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