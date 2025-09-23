"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";

import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import SectorTable from "./components/sectorTable";
import SectorModal from "./components/sectorModal";

const SectorPage = () => {
    const { handleOpenSectorModal } = useMainStore();
    return <PageContainer title="Sector">
        <DashboardCard title="Sector" action={
            <Button variant="contained" onClick={() => handleOpenSectorModal()}>
                Agregar sector
            </Button>
        }>
            <SectorTable />
        </DashboardCard>
        <SectorModal />
    </PageContainer>
}
export default SectorPage;