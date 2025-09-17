"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import CheckBoxApp from "@/app/components/checkbox/checkboxApp";
import { useMainStore } from "@/app/store";

const ArsPlanForm = () => {
    const { control } = useFormContext();
    const { arsEnsuranceList } = useMainStore();

    const arsEnsuranceOptions = arsEnsuranceList.map(ensurance => ({
        id: ensurance.arsEnsuranceId,
        name: ensurance.ensuranceName
    }));

    return (
       <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="afiliationNumberArs"
                    label="N° de Afiliación"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="arsPlansName"
                    label="Nombre del Plan"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="coveragePlanArs"
                    label="Plan de Cobertura"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp
                    name="maxLimitArs"
                    label="Límite Máximo ARS"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <AutocompleteApp 
                    name="arsEnsuranceId"
                    label="Aseguradora"
                    options={arsEnsuranceOptions}
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <CheckBoxApp 
                    name="internationalCoverage"
                    label="Cobertura Internacional"
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <CheckBoxApp 
                    name="isPlanActive"
                    label="Plan Activo"
                    control={control}
                />
            </Grid>
       </Grid>
    );
}
export default ArsPlanForm;