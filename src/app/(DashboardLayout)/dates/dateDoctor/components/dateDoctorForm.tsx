"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import { useMainStore } from "@/app/store";
import { useEffect } from "react";

const DateDoctorForm = () => {
    const { control } = useFormContext();
    const { dateDoctorList, getDateDoctorList } = useMainStore();

    useEffect(() => {
        getDateDoctorList();
    }, [getDateDoctorList]);

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
                    name="dateDoctorNextDate"
                    label="Próxima Cita"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="medicEvaluationId"
                    label="Evaluación Médica"
                    control={control}
                    options={dateDoctorList.map((item) => ({ id: item.medicEvaluationId, name: `Evaluación ${item.medicEvaluationId}` }))}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldApp
                    name="dateDoctorNotes"
                    label="Notas"
                    control={control}
                    fullWidth
                    multiline
                    rows={4}
                />
            </Grid>
        </Grid>
    );
}
export default DateDoctorForm;