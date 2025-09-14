"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import ArsPlanTable from "./components/arsPlanTable";
import ArsPlanModal from "./components/arsPlanModal";

const ArsPlanPage = () => {
    const {handleOpenArsPlanModal} = useMainStore();
    return (
        <PageContainer title="Plan de salud">
            <DashboardCard title="Plan de salud"
            action={
                <Button variant="contained" onClick={handleOpenArsPlanModal}>
                    Agregar plan de salud
                </Button>
            }
            >
                <ArsPlanTable />
            </DashboardCard>
            <ArsPlanModal />
        </PageContainer>
    );
}
export default ArsPlanPage;