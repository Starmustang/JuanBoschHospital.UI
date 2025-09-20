"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";

const MedicEvaluationForm = () => {
    const { control } = useFormContext();

    return (
        <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="weightEva"
                    label="Peso (lbs)"
                    control={control}
                    fullWidth
                    numericOnly
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="presurreEva"
                    label="Presión Arterial"
                    control={control}
                    fullWidth
                    numericOnly
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="breathingEva"
                    label="Respiración (rpm)"
                    control={control}
                    fullWidth
                    numericOnly
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="heartRateEva"
                    label="Ritmo Cardíaco (bpm)"
                    control={control}
                    fullWidth
                    numericOnly
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="heightEva"
                    label="Altura (cm)"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldApp
                    name="previousSickNessEva"
                    label="Enfermedades Anteriores"
                    control={control}
                    fullWidth
                    multiline
                    rows={3}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldApp
                    name="otherInfoEva"
                    label="Información Adicional"
                    control={control}
                    fullWidth
                    multiline
                    rows={3}
                />
            </Grid>
        </Grid>
    );
}
export default MedicEvaluationForm;