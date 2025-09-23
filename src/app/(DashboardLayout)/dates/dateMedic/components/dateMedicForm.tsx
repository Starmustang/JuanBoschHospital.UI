"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import DateTimePickerApp from "@/app/components/dateTimePickerApp/dateTimePickerApp";
import { useMainStore } from "@/app/store";
import { useEffect } from "react";

const DateMedicForm = () => {
    const { control } = useFormContext();
        const { patientList, doctorList, getPatientList, getDoctorList } = useMainStore();

        useEffect(() => {
        getPatientList();
        getDoctorList();
    }, [getPatientList, getDoctorList]);

    const patientOptions = patientList.map(patient => ({
        id: patient.patientId || 0,
        name: `${patient.patientName} ${patient.patientLastName || ''}`
    }));

        const doctorOptions = doctorList.map(doctor => ({
        id: doctor.doctorId || 0,
        name: `${doctor.doctorName} ${doctor.doctorLastName || ''}`
    }));

            const consultationTypeOptions = [
        { id: 0, name: 'Primera Consulta' },
        { id: 1, name: 'Seguimiento' },
        { id: 2, name: 'Consulta de Procedimiento' },
        { id: 3, name: 'Otros' },
    ];

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="patientId"
                    label="Paciente"
                    options={patientOptions}
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                 <AutocompleteApp
                    name="doctorId"
                    label="Doctor"
                    options={doctorOptions}
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <DateTimePickerApp
                    name="dateMedicDate"
                    label="Fecha de Cita"
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <DateTimePickerApp
                    name="hospitalMedicDate"
                    label="Fecha de Ingreso Hospitalario"
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="consultationTypeId"
                    label="Tipo de Consulta"
                    options={consultationTypeOptions}
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                            </Grid>
        </Grid>
    );
}
export default DateMedicForm;
