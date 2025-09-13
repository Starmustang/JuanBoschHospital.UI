"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import MunicipalityModal from "./components/municipalityModal";
import MunicipalityTable from "./components/municipalityTable";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";

const MunicipalityPage = () => {
    const { handleOpenMunicipalityModal } = useMainStore();
    return (
        <PageContainer title="Municipios">
            <DashboardCard title="Municipios" action={
                <Button variant="contained" onClick={handleOpenMunicipalityModal}>
                    Agregar municipio
                </Button>
            }>
                <MunicipalityTable />
            </DashboardCard>
            <MunicipalityModal />
        </PageContainer>
    );
}
export default MunicipalityPage;