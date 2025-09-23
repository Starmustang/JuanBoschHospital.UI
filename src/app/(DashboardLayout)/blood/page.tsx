"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import BloodTable from "./components/bloodTable";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import BloodModal from "./components/bloodModal";

const BloodPage = () => {
    const {handleOpenBloodModal} = useMainStore();
    return (
        <PageContainer title="Sangre">
            <DashboardCard title="Sangre"
            action={
                <Button variant="contained" onClick={() => handleOpenBloodModal()}>
                    Agregar tipo de sangre
                </Button>
            }
            >
                <BloodTable />
            </DashboardCard>
            <BloodModal />
        </PageContainer>
    );
}
export default BloodPage;