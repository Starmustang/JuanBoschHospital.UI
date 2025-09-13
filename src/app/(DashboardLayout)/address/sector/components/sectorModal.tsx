"use client";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";

import { FormProvider, useForm } from "react-hook-form";
import { useMainStore } from "@/app/store";
import { Sector } from "@/app/(DashboardLayout)/types/Address/sector/sector";
import SectorForm from "./sectorForm";
const SectorModal = () => {
    const { showSectorModal, handleCloseSectorModal } = useMainStore();
    return (
        <Dialog open={showSectorModal} onClose={handleCloseSectorModal}>
            <DialogContent>
                <DialogTitle>Agregar sector</DialogTitle>
                <SectorForm />
            </DialogContent>
        </Dialog>
    );
}
export default SectorModal;
