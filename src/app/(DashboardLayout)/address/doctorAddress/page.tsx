"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import DoctorAddressTable from "./components/doctorAddressTable";
import DoctorAddressModal from "./components/doctorAddressModal";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";

const DoctorAddressPage = () => {
    const {handleOpenDoctorAddressModal} = useMainStore(state => state);
    return (
        <PageContainer title="Direcciones de Doctores">
            <DashboardCard title="Direcciones de Doctores" action={
                <Button variant="contained"  onClick={() => {handleOpenDoctorAddressModal()}}>Agregar</Button>
            }>
                <DoctorAddressTable />
            </DashboardCard>
            <DoctorAddressModal />
        </PageContainer>
    );
}
export default DoctorAddressPage;