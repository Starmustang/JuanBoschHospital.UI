"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import MedicRecordsTable from "./components/medicRecordsTable";
import MedicRecordsModal from "./components/medicRecordsModal";
import { useMainStore } from "@/app/store";
import { Button } from "@mui/material";

const MedicRecordsPage = () => {
    const {handleOpenMedicRecordsModal} = useMainStore(state => state);
    return (
        <PageContainer>
            <DashboardCard title="Registros Medicos" action={
                <Button variant="contained" onClick={() => handleOpenMedicRecordsModal()}>Agregar Registro Medico</Button>
            }>
                <MedicRecordsTable />   
            </DashboardCard>
            <MedicRecordsModal />
        </PageContainer>
    );
}
export default MedicRecordsPage;