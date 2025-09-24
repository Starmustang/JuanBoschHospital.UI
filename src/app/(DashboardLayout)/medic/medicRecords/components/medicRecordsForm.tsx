"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useMainStore } from "@/app/store";
import { useEffect } from "react";

const MedicRecordsForm = () => {
    const { control } = useFormContext();
    const { patientList, doctorList, getPatientList, getDoctorList } = useMainStore();

    useEffect(() => {
        getPatientList();
        getDoctorList();
    }, [getPatientList, getDoctorList]);

    const patientOptions = patientList.map(patient => ({
        id: patient.patientId!,
        name: `${patient.patientName} ${patient.patientLastName}`
    }));

    const doctorOptions = doctorList.map(doctor => ({
        id: doctor.doctorId!,
        name: `${doctor.doctorName} ${doctor.doctorLastName}`
    }));

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
                <TextFieldApp
                    name="followUpMedicRecord"
                    label="Seguimiento"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <TextFieldApp
                    name="signsMedicRecord"
                    label="Signos"
                    control={control}
                    fullWidth
                    multiline
                />
            </Grid>
        </Grid>
    );
}
export default MedicRecordsForm;