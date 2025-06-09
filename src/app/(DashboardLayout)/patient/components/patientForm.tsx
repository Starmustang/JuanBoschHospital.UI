import { Grid2 as Grid, Typography, Box, Divider, Paper } from "@mui/material";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useFormContext } from "react-hook-form";
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';

const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(1),
        color: theme.palette.primary.main
    },
    '& .MuiTypography-root': {
        fontWeight: 500
    }
}));

const FormSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
}));

const PatientForm = () => {
    const { control } = useFormContext();
    return (
        <form style={{ width: '100%' }}>
            <Box sx={{ width: '100%', p: 0 }}>
                {/* Personal Information Section */}
                <FormSection>
                    <SectionHeader>
                        <PersonIcon />
                        <Typography variant="h6">Información Personal</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientName"
                                control={control}
                                label="Nombre"
                                placeholder="Ingrese el nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientLastName"
                                control={control}
                                label="Apellido"
                                placeholder="Ingrese el apellido"
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientIdCard"
                                control={control}
                                label="Cédula"
                                placeholder="Ingrese la cédula"
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientPassport"
                                control={control}
                                label="Pasaporte"
                                placeholder="Ingrese el pasaporte"
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientBirthDate"
                                control={control}
                                label="Fecha de nacimiento"
                                placeholder="Ingrese la fecha de nacimiento"
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientGender"
                                control={control}
                                label="Género"
                                placeholder="Ingrese el género"
                            />
                        </Grid>
                    </Grid>
                </FormSection>
                
                {/* Contact Information Section */}
                <FormSection>
                    <SectionHeader>
                        <ContactMailIcon />
                        <Typography variant="h6">Información de Contacto</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientEmail"
                                control={control}
                                label="Email"
                                placeholder="Ingrese el email"
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientPhone"
                                control={control}
                                label="Teléfono"
                                placeholder="Ingrese el teléfono"
                            />
                        </Grid>
                    </Grid>
                </FormSection>
                
                {/* Address Information Section */}
                <FormSection>
                    <SectionHeader>
                        <HomeIcon />
                        <Typography variant="h6">Dirección</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientDirection.AddressId"
                                control={control}
                                label="Dirección"
                                placeholder="Ingrese la dirección"
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextFieldApp
                                name="PatientDirection.HomeNumber"
                                control={control}
                                label="Número"
                                placeholder="Ingrese el número"
                            />
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <TextFieldApp
                                name="PatientDirection.HouseStreet"
                                control={control}
                                label="Calle"
                                placeholder="Ingrese la calle"
                            />
                        </Grid>
                    </Grid>
                </FormSection>
            </Box>
        </form>
    );
}

export default PatientForm;