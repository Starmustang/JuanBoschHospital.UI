"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import ProvinceForm from "./provinceForm";
import { useMainStore } from "@/app/store";
import { Province } from "@/app/(DashboardLayout)/types/Address/province/province";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
const ProvinceModal = () => {
    const { showProvinceModal, handleCloseProvinceModal, createProvince } = useMainStore();
    const formMethods = useForm<Province>();
    const { handleSubmit, reset } = formMethods;
    const onSubmit = (data: Province) => {
        createProvince(data);
        btnClose();
    }
    const btnClose = () => {
        reset();
        handleCloseProvinceModal();
    }
    return (
       <Dialog open={showProvinceModal} onClose={btnClose}>
        <DialogTitle>Provincia</DialogTitle>
        <DialogContent>
            <FormProvider {...formMethods}>
            <ProvinceForm />
            </FormProvider>
        </DialogContent>
        <DialogActions>
            <Button color="error" variant="contained" onClick={btnClose}>Cancelar</Button>
            <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>Guardar</Button>
        </DialogActions>
       </Dialog>
    );
}
export default ProvinceModal;