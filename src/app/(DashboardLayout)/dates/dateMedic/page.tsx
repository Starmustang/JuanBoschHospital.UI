"use client";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import DateMedicTable from "./components/dateMedicTable";
import { Button } from "@mui/material";
import { useMainStore } from "@/app/store";
import DateMedicModal from "./components/dateMedicModal";

const DateMedicPage = () => {
    const {handleOpenDateMedicModal, showDateMedicModal} = useMainStore(state => state);
    return (
       <PageContainer title="cita medica">
        <DashboardCard title="citas medicas" action={
            <Button variant="contained" onClick={() =>handleOpenDateMedicModal()}>
                Agregar fecha de medicion
            </Button>
            
        }>
            <DateMedicTable />
        </DashboardCard>
        <DateMedicModal />
       </PageContainer>
    );
}
export default DateMedicPage;