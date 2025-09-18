'use client'
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import DoctorEnsuranceTable from "./components/doctorEnsuranceTable";
import DoctorEnsuranceModal from "./components/doctorEnsuranceModal";
import { useMainStore } from "@/app/store";
import { Button } from "@mui/material";

const DoctorEnsurancePage = () => {
    const {handleOpenDoctorEnsuranceModal, showDoctorEnsuranceModal} = useMainStore(state => state);
    return (
        <PageContainer>            
            <DashboardCard title="Seguro de doctor" action={
                <Button variant="contained" onClick={() => handleOpenDoctorEnsuranceModal()}>
                    Agregar seguro de doctor
                </Button>
            }>
                <DoctorEnsuranceTable />
            </DashboardCard>
            <DoctorEnsuranceModal />
        </PageContainer>
    );
}
export default DoctorEnsurancePage;