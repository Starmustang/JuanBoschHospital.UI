"use client";
import ProvinceModal from "./components/provinceModal";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import { useMainStore } from "@/app/store";
import { Button } from "@mui/material";
import { useEffect } from "react";
import ProvinceTable from "./components/provinceTable";
function ProvincePage() {
    const { provinceList, getProvinceList } = useMainStore();
    useEffect(() => {
        getProvinceList();
    }, [getProvinceList]);
    const { handleOpenProvinceModal } = useMainStore();
    const btnOpenProvinceModal = () => {
        return (
            <Button variant="contained" onClick={() => handleOpenProvinceModal()}>
                Agregar provincia
            </Button>
        )
    }
    return (
        <PageContainer title="Provincias">
            <DashboardCard title="Provincias" action={btnOpenProvinceModal()}>
                <ProvinceTable />
            </DashboardCard>
            <ProvinceModal />
        </PageContainer>
    );
}

export default ProvincePage;    