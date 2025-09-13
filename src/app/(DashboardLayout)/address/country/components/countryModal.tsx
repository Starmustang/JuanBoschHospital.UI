import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import CountryForm from "./countryForm";
import { FormProvider, useForm } from "react-hook-form";
import { useMainStore } from "@/app/store";
import { Country } from "../../../types/Address/country/country";

const CountryModal = () => {
    const formMethods = useForm<Country>();
    const { handleSubmit, reset } = formMethods;
    const {showCountryModal, handleCloseCountryModal, createCountry} = useMainStore();
    
    const btnClose = () => {
        reset();
        handleCloseCountryModal();
    }
    const onSubmit = (data: Country) => {
        createCountry(data);
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
                <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
export default CountryModal;