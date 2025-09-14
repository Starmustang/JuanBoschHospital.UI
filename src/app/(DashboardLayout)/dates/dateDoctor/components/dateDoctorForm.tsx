"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";

const DateDoctorForm = () => {
    const { control } = useFormContext();

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="dateDoctorSintoms"
                    label="Síntomas"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="dateDoctorIndicatedAnalisis"
                    label="Análisis Indicados"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="dateDoctorTreatment"
                    label="Tratamiento"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="dateDoctorNotes"
                    label="Notas"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="dateDoctorNextDate"
                    label="Próxima Cita"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="medicEvaluationId"
                    label="ID de Evaluación Médica (Placeholder)"
                    control={control}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
}
export default DateDoctorForm;