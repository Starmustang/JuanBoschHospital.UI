"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import MedicEvaluationTable from "./components/medicEvaluationTable";
import MedicEvaluationModal from "./components/medicEvaluationModal";
import { useMainStore } from "@/app/store";
import { Button } from "@mui/material";

const MedicEvaluationPage = () => {
    const { handleOpenMedicEvaluationModal } = useMainStore();
    return (
        <PageContainer>
            <DashboardCard title="Evaluaciones Medicas" action={
                <Button variant="contained" onClick={() => handleOpenMedicEvaluationModal()}>Agregar Evaluacion</Button>
            }>
                <MedicEvaluationTable />
            </DashboardCard>
            <MedicEvaluationModal />
        </PageContainer>
    )
}
export default MedicEvaluationPage;