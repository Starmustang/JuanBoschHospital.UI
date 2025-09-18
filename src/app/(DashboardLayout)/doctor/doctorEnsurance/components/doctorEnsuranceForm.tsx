"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useMainStore } from "@/app/store";

const DoctorEnsuranceForm = () => {
    const { control } = useFormContext();
    const { doctorList, arsEnsuranceList } = useMainStore();

    const doctorOptions = doctorList.map(doctor => ({
        id: doctor.doctorId!,
        name: `${doctor.doctorName} ${doctor.doctorLastName}`
    }));

    const arsEnsuranceOptions = arsEnsuranceList.map(ars => ({
        id: ars.arsEnsuranceId,
        name: ars.ensuranceName
    }));

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="doctorId"
                    label="Doctor"
                    options={doctorOptions}
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="arsEnsuranceId"
                    label="ARS Aseguradora"
                    options={arsEnsuranceOptions}
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldApp
                    name="medicCode"
                    label="Código Médico"
                    control={control}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
}
export default DoctorEnsuranceForm;