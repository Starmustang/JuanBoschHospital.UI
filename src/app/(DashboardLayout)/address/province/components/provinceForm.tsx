"use client";
import { Grid2 as Grid } from "@mui/material";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import { useForm } from "react-hook-form";
import { useMainStore } from "@/app/store";
const ProvinceForm = () => {
    const { control } = useForm();
    const { countryList } = useMainStore();
    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 12}}>
                <TextFieldApp
                    label="Nombre"
                    name="provinceName"
                    type="text"
                    fullWidth
                    control={control}
                />
            </Grid>
            <Grid size={{xs: 12, md: 12}}>
                <AutocompleteApp
                    label="Pais"
                    name="countryId"
                    options={countryList.map((country) => ({
                        id: country.countryId,
                        name: country.countryName
                    }))}
                    control={control}
                />
            </Grid>
        </Grid>
    );
}
export default ProvinceForm;