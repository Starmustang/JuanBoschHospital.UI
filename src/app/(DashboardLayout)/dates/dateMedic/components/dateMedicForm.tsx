"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useMainStore } from "@/app/store";

const DateMedicForm = () => {
    const { control } = useFormContext();
    const { patientList, dateDoctorList } = useMainStore();

    const patientOptions = patientList.map(patient => ({
        id: patient.PatientId || 0,
        name: `${patient.PatientName} ${patient.PatientLastName || ''}`
    }));

    const dateDoctorOptions = dateDoctorList.map(date => ({
        id: date.dateDoctorId,
        name: `Cita del ${new Date(date.dateDoctorNextDate).toLocaleDateString()}`
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
                 <TextFieldApp
                    name="doctorId"
                    label="Doctor (Placeholder)"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="dateMedicDate"
                    label="Fecha de Cita"
                    type="date"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="hospitalMedicDate"
                    label="Fecha de Ingreso Hospitalario"
                    type="date"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="consultationTypeId"
                    label="Tipo de Consulta (Placeholder)"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="dateDoctorId"
                    label="Cita de Doctor"
                    options={dateDoctorOptions}
                    control={control}
                />
            </Grid>
        </Grid>
    );
}
export default DateMedicForm;
