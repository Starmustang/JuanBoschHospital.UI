"use client";
import DateDoctorTable from "./components/dateDoctorTable";
import DateDoctorModal from "./components/dateDoctorModal";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";

const DateDoctorPage = () => {
    const {handleOpenDateDoctorModal} = useMainStore(state => state);
    return (
        <>
        <PageContainer title="Citas con Doctores">
            <DashboardCard title="Citas con Doctores" action={
                <Button variant="contained" onClick={() => handleOpenDateDoctorModal()}>Agregar Cita con Doctor</Button>
            }>
                <DateDoctorTable />
            </DashboardCard>
            <DateDoctorModal />
        </PageContainer>
        </>
    );
}
export default DateDoctorPage;