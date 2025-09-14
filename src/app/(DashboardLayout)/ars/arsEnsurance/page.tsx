"use client";
import PageContainer from "@/app/components/container/PageContainer";
import ArsEnsuranceTable from "./components/arsEnsuranceTable";
import DashboardCard from "@/app/components/shared/DashboardCard";
import ArsEnsuranceModal from "./components/arsEnsuranceModal";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";

const ArsEnsurancePage = () => {
    const {handleOpenArsEnsuranceModal} = useMainStore();
    return (
        <PageContainer>
            <DashboardCard title="Aseguradoras" action={
                <Button variant="contained" onClick={handleOpenArsEnsuranceModal}>
                    Agregar aseguradora
                </Button>
            }>
                <ArsEnsuranceTable />
            </DashboardCard>
            <ArsEnsuranceModal />
        </PageContainer>
    );
}
export default ArsEnsurancePage;