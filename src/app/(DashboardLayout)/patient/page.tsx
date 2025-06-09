import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import PatientTable from "./components/patientTable";

const PatientPage = () => {
    return (
        <PageContainer title="Paciente">
            <DashboardCard title="Paciente">
                <>
                <PatientTable />
                </>
            </DashboardCard>
        </PageContainer>
    );
};

export default PatientPage;
