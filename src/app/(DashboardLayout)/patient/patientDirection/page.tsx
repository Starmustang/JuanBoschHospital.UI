"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import PatientDirectionTable from "./components/patientDirectionTable";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import PatientDirectionModal from "./components/patientDirectionModal";

const PatientDirectionPage = () => {
    const {handleOpenPatientDirectionModal} = useMainStore();
    return (
        <PageContainer title="Direcciones">
            <DashboardCard title="Direcciones" action={
                <Button variant="contained" onClick={handleOpenPatientDirectionModal} sx={{mb: 2}}>Registrar direccion</Button>
            }>
                <PatientDirectionTable/>
            </DashboardCard>
            <PatientDirectionModal/>
        </PageContainer>
    );
};

export default PatientDirectionPage;