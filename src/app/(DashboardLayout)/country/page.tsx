"use client";
import CountryTable from "./components/countryTable";
import CountryModal from "./components/countryModal";
import PageContainer from "@/app/components/container/PageContainer";

function CountryPage() {
    return (
        <>
        <PageContainer title="Paises">
        <CountryTable />
        <CountryModal />
        </PageContainer>
        </>
    );
}

export default CountryPage;