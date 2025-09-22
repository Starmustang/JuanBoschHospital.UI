import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import CountryForm from "./countryForm";
import { FormProvider, useForm } from "react-hook-form";
import { useMainStore } from "@/app/store";
import { Country } from "../../../types/Address/country/country";
import { useEffect } from "react";

const CountryModal = () => {
    const formMethods = useForm<Country>({
        defaultValues: {
            countryName: "",
            countryLanguage: "",
            countryCurrency: ""
        }
    });
    const { handleSubmit, reset, setValue } = formMethods;
    const {showCountryModal, handleCloseCountryModal, createCountry, countryId, updateCountry, getCountryDetailed, countryDetailed} = useMainStore();

    useEffect(() => {
        if(countryId){
            getCountryDetailed(countryId);            
        }
    }, [countryId]);

    useEffect(() => {
        if(countryDetailed && countryId){
            setValue('countryName', countryDetailed.countryName);
            setValue('countryLanguage', countryDetailed.countryLanguage);
            setValue('countryCurrency', countryDetailed.countryCurrency);
        }
    }, [countryDetailed, countryId]);
    
    const btnClose = () => {
        reset();
        handleCloseCountryModal();
    }
    const onSubmit = (data: Country) => {
        console.log("data: ",data);
        if(countryId){
            const country = {
                ...data,
                countryId: countryId
            }
            updateCountry(country);
        }else{
            createCountry(data);
        }
        btnClose();
    }
    
    return (
        <Dialog
        open={showCountryModal}
        onClose={btnClose}
        fullWidth
        maxWidth="md"
        >
            <DialogTitle>Pais</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods}>
                <CountryForm />
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{countryId ? 'Editar' : 'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default CountryModal;