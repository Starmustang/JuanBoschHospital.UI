"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import DoctorTable from "./components/doctorTable";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import DoctorModal from "./components/doctorModal";

const DoctorPage = () => {
    const {handleOpenDoctorModal} = useMainStore(state => state);
    return (
        <PageContainer title="Doctor">
            <DashboardCard title="Doctores" action={
                <Button variant="contained" onClick={() => handleOpenDoctorModal()}>Agregar Doctor</Button>
            }>
                <DoctorTable />
            </DashboardCard>
            <DoctorModal />
        </PageContainer>
    );
}
export default DoctorPage;