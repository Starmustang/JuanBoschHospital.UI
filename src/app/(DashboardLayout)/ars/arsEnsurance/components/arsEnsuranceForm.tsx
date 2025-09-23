"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import DateTimePickerApp from "@/app/components/dateTimePickerApp/dateTimePickerApp";
import TimePickerApp from "@/app/components/timePickerApp/timePickerApp";

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
                    phoneFormat
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensurancePhone2"
                    label="Teléfono 2"
                    control={control}
                    fullWidth
                    phoneFormat
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="ensuranceFax"
                    label="Fax"
                    control={control}
                    fullWidth
                    phoneFormat
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
                <TimePickerApp
                    name="ensuranceSchedule"
                    label="Horario de apertura"
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <DateTimePickerApp
                    name="ensuranceUpdateDate"
                    label="Fecha de Actualización"
                    control={control}
                />
            </Grid>
        </Grid>
    );
}
export default ArsEnsuranceForm;