"use client";
import { Grid2 as Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { size } from "lodash";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import { useMainStore } from "@/app/store";

const MunicipalityForm = () => {
    const { control } = useForm();
    const { provinceList } = useMainStore();
    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 12}}>
                <TextFieldApp name={"municipalityName"} label={"Nombre"} control={control}/>
            </Grid>
            <Grid size={{xs: 12, md: 12}}>
                <AutocompleteApp name={"provinceId"} control={control} label={"Provincia"} options={provinceList.map((province) => ({
                    id: province.provinceId,
                    name: province.provinceName
                }))} />
            </Grid>
        </Grid>
    );
}
export default MunicipalityForm;