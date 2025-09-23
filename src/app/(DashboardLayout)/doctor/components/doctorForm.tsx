"use client";
import { Grid2 as Grid, Typography, Box, Divider, Paper } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useMainStore } from "@/app/store";
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import WorkIcon from '@mui/icons-material/Work';
import { styled } from '@mui/material/styles';
import { useEffect } from "react";

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

const DoctorForm = () => {
    const { control } = useFormContext();
    const { doctorAddressList, getDoctorAddressList } = useMainStore();

    const addressOptions = doctorAddressList.map(address => ({
        id: address.doctorAddressId,
        name: `${address.doctorStreet}, ${address.doctorHouseNumber}`
    }));

    useEffect(() => {
        getDoctorAddressList();
    }, [getDoctorAddressList]);

    return (
        <Box sx={{ width: '100%', p: 0 }}>
            <FormSection>
                <SectionHeader>
                    <PersonIcon />
                    <Typography variant="h6">Información Personal</Typography>
                </SectionHeader>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="doctorName" label="Nombre" control={control} /></Grid>
                    <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="doctorLastName" label="Apellido" control={control} /></Grid>
                    <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="doctorIdCard" label="Cédula" control={control} /></Grid>
                    <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="doctorPassport" label="Pasaporte" control={control} /></Grid>
                </Grid>
            </FormSection>

            <FormSection>
                <SectionHeader>
                    <ContactMailIcon />
                    <Typography variant="h6">Información de Contacto</Typography>
                </SectionHeader>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="doctorPhone" label="Teléfono" control={control} phoneFormat /></Grid>
                    <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="doctorEmail" label="Email" control={control} /></Grid>
                    <Grid size={{ xs: 12 }}><AutocompleteApp name="doctorAddressId" label="Dirección" options={addressOptions} control={control} /></Grid>
                </Grid>
            </FormSection>

            <FormSection>
                <SectionHeader>
                    <WorkIcon />
                    <Typography variant="h6">Información Profesional</Typography>
                </SectionHeader>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="doctorSpeciality" label="Especialidad" control={control} /></Grid>
                    {/* <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="doctorExecatur" label="Execatur" control={control} /></Grid> */}
                </Grid>
            </FormSection>
        </Box>
    );
}
export default DoctorForm;