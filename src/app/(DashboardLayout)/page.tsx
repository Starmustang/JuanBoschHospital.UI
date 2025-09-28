"use client";
import Typography from '@mui/material/Typography';
import PageContainer from "@/app/components/container/PageContainer";
import { Grid, Card, CardContent, Box, Avatar } from '@mui/material';
import { IconUsers, IconCalendar, IconStethoscope, IconFileDescription, IconReportMedical, IconEmergencyBed } from '@tabler/icons-react';

const FeatureCard = ({ icon, title, description, color }: any) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Avatar sx={{ bgcolor: `${color}.main`, mx: 'auto', width: 60, height: 60, mb: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

const Dashboard = () => {
  const features = [
    {
      icon: <IconUsers size="2rem" />,
      title: 'Gestión de Pacientes',
      description: 'Cree y administre perfiles de pacientes, incluyendo su información demográfica y de contacto.',
      color: 'primary',
    },
    {
      icon: <IconCalendar size="2rem" />,
      title: 'Programación de Citas',
      description: 'Agende, reprograme y consulte citas médicas de forma rápida y organizada para optimizar el tiempo.',
      color: 'secondary',
    },
    {
      icon: <IconStethoscope size="2rem" />,
      title: 'Administración de Médicos',
      description: 'Gestione los perfiles de los médicos, sus especialidades, horarios y disponibilidad.',
      color: 'success',
    },
    {
      icon: <IconFileDescription size="2rem" />,
      title: 'Historiales Clínicos',
      description: 'Acceda a historiales médicos digitales completos y seguros para una mejor atención al paciente.',
      color: 'warning',
    },
    {
      icon: <IconReportMedical size="2rem" />,
      title: 'Manejo de Seguros (ARS)',
      description: 'Integre y gestione los diferentes planes de ARS para una facturación y cobertura eficientes.',
      color: 'error',
    },
    {
      icon: <IconEmergencyBed size="2rem" />,
      title: 'Reportes y Estadísticas',
      description: 'Genere reportes detallados para analizar la operación del hospital y facilitar la toma de decisiones.',
      color: 'info',
    },
  ];

  return (
    <PageContainer title="Dashboard" description="Página principal del dashboard">
      <Box>
        <Grid container spacing={3}>
          {/* Welcome Banner */}
          <Grid item xs={12}>
            <Card elevation={0} sx={{ backgroundColor: 'primary.light', p: 3, textAlign: 'center' }}>
              <Typography variant="h2" component="h1" color="primary.main" fontWeight="600">
                Sistema de Gestión Hospitalaria Juan Bosch
              </Typography>
              <Typography variant="h6" color="primary.dark" sx={{ mt: 1 }}>
                Una solución integral para la administración eficiente de su centro de salud.
              </Typography>
            </Card>
          </Grid>

          {/* Feature Cards */}
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
