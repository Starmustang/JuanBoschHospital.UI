"use client";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { Grid2 as Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const CountryForm = () => {
    const { control } = useForm();
    
    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 4}}>
       <TextFieldApp
       label="Nombre"
       name="countryName"
       type="text"       
       fullWidth       
       control={control}
       />       
       </Grid>
       <Grid size={{xs: 12, md: 4}}>
       <TextFieldApp
       label="Idioma"
       name="countryLanguage"
       type="text"       
       fullWidth       
       control={control}
       />       
       </Grid>
       <Grid size={{xs: 12, md: 4}}>
       <TextFieldApp
       label="Moneda"
       name="countryCurrency"
       type="text"       
       fullWidth       
       control={control}
       />       
       </Grid>
       </Grid>
    );
}

export default CountryForm;