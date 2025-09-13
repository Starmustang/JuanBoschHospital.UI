"use client";
import CountryTable from "./components/countryTable";
import CountryModal from "./components/countryModal";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import { useMainStore } from "@/app/store";
import { Button } from "@mui/material";

function CountryPage() {
    const { handleOpenCountryModal } = useMainStore();

    return (
        <PageContainer title="Paises">
            <DashboardCard 
                title="Paises" 
                action={
                    <Button variant="contained" onClick={handleOpenCountryModal}>
                        Agregar pais
                    </Button>
                }
            >
                <CountryTable />
            </DashboardCard>
            <CountryModal />
        </PageContainer>
    );
}

export default CountryPage;