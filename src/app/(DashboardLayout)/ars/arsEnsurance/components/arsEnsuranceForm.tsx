"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";

const ArsEnsuranceForm = () => {
    const { control } = useFormContext();

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensuranceName"
                    label="Nombre"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensuranceDirection"
                    label="Dirección"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensurancePhone"
                    label="Teléfono"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensurancePhone2"
                    label="Teléfono 2"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensuranceFax"
                    label="Fax"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensuranceEmail"
                    label="Email"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensuranceSchedule"
                    label="Horario"
                    control={control}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
}
export default ArsEnsuranceForm;
