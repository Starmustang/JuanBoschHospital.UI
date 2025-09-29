"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import PatientTable from "./components/patientTable";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import PatientModal from "./components/patientModal";
import { useUserRole } from "@/app/hooks/useUserRole";
import { PERMISSIONS, hasPermission } from "@/app/utils/permissions";

const PatientPage = () => {
    const {handleOpenPatientModal} = useMainStore();
    const { userRoles } = useUserRole();
    
    // Check if user can create patients (auxiliar cannot create, only update)
    const canCreatePatients = hasPermission(userRoles, PERMISSIONS.PATIENT_CREATE);
    
    return (
        <PageContainer title="Paciente">
            <DashboardCard title="Paciente" action={
                canCreatePatients ? (
                    <Button variant="contained" onClick={() => handleOpenPatientModal()} sx={{mb: 2}}>
                        Registrar paciente
                    </Button>
                ) : null
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
