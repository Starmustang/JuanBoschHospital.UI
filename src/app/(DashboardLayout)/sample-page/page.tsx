"use client";
import Typography from '@mui/material/Typography';
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";

const SamplePage = () => {
  return (
    <PageContainer title="Página de Bienvenida" description="Esta es la página de bienvenida">
      <DashboardCard title="¡Bienvenido!">
        <div>
          <Typography variant="h5" component="h1" gutterBottom>
            Bienvenido al Sistema de Gestión del Hospital Juan Bosch
          </Typography>
          <Typography variant="body1">
            Desde este panel, usted podrá gestionar la información de pacientes, médicos, citas y mucho más.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Utilice el menú de navegación a la izquierda para acceder a las diferentes secciones del sistema.
          </Typography>
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
