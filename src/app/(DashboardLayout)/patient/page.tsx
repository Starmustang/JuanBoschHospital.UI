"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import PatientTable from "./components/patientTable";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import PatientModal from "./components/patientModal";

const PatientPage = () => {
    const {handleOpenPatientModal} = useMainStore();
    return (
        <PageContainer title="Paciente">
            <DashboardCard title="Paciente" action={
                <Button variant="contained" onClick={handleOpenPatientModal} sx={{mb: 2}}>Registrar paciente</Button>
            }>
                <>
                
                <PatientTable />
                <PatientModal />
                </>
            </DashboardCard>
        </PageContainer>
    );
};

export default PatientPage;
