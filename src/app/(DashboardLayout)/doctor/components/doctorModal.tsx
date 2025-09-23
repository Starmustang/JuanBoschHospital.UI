import { useForm, FormProvider } from "react-hook-form";
import { Doctor, DoctorPost, DoctorPut } from "../../types/Doctor/Doctor";
import { useMainStore } from "@/app/store";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import DoctorForm from "./doctorForm";
import { useEffect } from "react";

const DoctorModal = () => {
    const { showDoctorModal, handleCloseDoctorModal, doctorId, getDoctorDetailed, doctorDetailed, createDoctor, updateDoctor } = useMainStore();
    const formMethods = useForm<Doctor>({
        defaultValues: {
            doctorName: '',
            doctorLastName: '',
            doctorPhone: '',
            doctorEmail: '',
            doctorIdCard: '',
            doctorPassport: '',
            doctorSpeciality: '',
            doctorAddressId: 0,
            doctorHouseNumber: '',
            doctorStreet: '',
            doctorExecatur: ''
        }
    });
    const { handleSubmit, reset, setValue } = formMethods;

    const btnClose = () => {
        reset();
        handleCloseDoctorModal();
    }

    const onSubmit = (data: Doctor) => {
        const doctorData: Omit<Doctor, 'doctorId'> = {
            doctorName: data.doctorName,
            doctorLastName: data.doctorLastName,
            doctorPhone: data.doctorPhone,
            doctorEmail: data.doctorEmail,
            doctorIdCard: data.doctorIdCard,
            doctorPassport: data.doctorPassport,
            doctorSpeciality: data.doctorSpeciality,
            doctorAddressId: data.doctorAddressId,
            doctorHouseNumber: data.doctorHouseNumber,
            doctorStreet: data.doctorStreet,
            doctorExecatur: data.doctorExecatur
        };

        if (doctorId) {
            const doctorToUpdate: DoctorPut = {
                doctorId: doctorId,
                ...doctorData,
            };
            updateDoctor(doctorToUpdate);
        } else {
            const doctorToCreate: DoctorPost = doctorData;
            createDoctor(doctorToCreate);
        }
        btnClose();
    }

    useEffect(() => {
        if (doctorId) {
            getDoctorDetailed(doctorId);
        }
    }, [doctorId, getDoctorDetailed]);

    useEffect(() => {
        if (doctorDetailed && doctorId) {
            setValue('doctorName', doctorDetailed.doctorName);
            setValue('doctorLastName', doctorDetailed.doctorLastName);
            setValue('doctorPhone', doctorDetailed.doctorPhone);
            setValue('doctorEmail', doctorDetailed.doctorEmail);
            setValue('doctorIdCard', doctorDetailed.doctorIdCard);
            setValue('doctorPassport', doctorDetailed.doctorPassport);
            setValue('doctorSpeciality', doctorDetailed.doctorSpeciality);
            setValue('doctorAddressId', doctorDetailed.doctorAddressId);
            setValue('doctorHouseNumber', doctorDetailed.doctorHouseNumber);
            setValue('doctorStreet', doctorDetailed.doctorStreet);
            setValue('doctorExecatur', doctorDetailed.doctorExecatur);
        }
    }, [doctorDetailed, doctorId, setValue]);

    return (
        <Dialog
            open={showDoctorModal}
            onClose={btnClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>{doctorId ? 'Editar' : 'Agregar'} Doctor</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                    <DoctorForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{doctorId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DoctorModal;