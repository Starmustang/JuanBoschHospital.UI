"use client";
import { Grid2 as Grid, Typography, Box, Divider, Paper } from "@mui/material";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useFormContext } from "react-hook-form";
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { styled } from '@mui/material/styles';
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import { useMainStore } from "@/app/store";

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
    const { arsPlanList, patientDirectionList, bloodList, medicRecordsList, doctorList, dateMedicList } = useMainStore();

    const arsPlanOptions = arsPlanList.map(plan => ({ id: plan.arsPlansId, name: plan.arsPlansName }));
    const patientDirectionOptions = patientDirectionList.map(dir => ({ id: dir.addressId, name: `${dir.houseStreet}, ${dir.sectorName}` }));
    const bloodOptions = bloodList.map(b => ({ id: b.bloodId!, name: b.bloodType }));
    const medicRecordsOptions = medicRecordsList.map(rec => ({ id: rec.recordId, name: `Cita con ${rec.patientName}` }));
    const doctorOptions = doctorList.map(doc => ({ id: doc.doctorId!, name: `${doc.doctorName} ${doc.doctorLastName}` }));
    const dateMedicOptions = dateMedicList.map(date => ({ id: date.dateMedicId, name: `Cita para ${date.patientName} el ${new Date(date.dateMedicDate).toLocaleDateString()}` }));

    return (
        <form style={{ width: '100%' }}>
            <Box sx={{ width: '100%', p: 0 }}>
                <FormSection>
                    <SectionHeader>
                        <PersonIcon />
                        <Typography variant="h6">Información Personal</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientName" control={control} label="Nombre" /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientLastName" control={control} label="Apellido" /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientIdCard" control={control} label="Cédula" /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientPassport" control={control} label="Pasaporte" /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientBirthDate" control={control} label="Fecha de Nacimiento" type="date" /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientGender" control={control} label="Género" /></Grid>
                    </Grid>
                </FormSection>

                <FormSection>
                    <SectionHeader>
                        <ContactMailIcon />
                        <Typography variant="h6">Información de Contacto</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientEmail" control={control} label="Email" /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientPhone" control={control} label="Teléfono" phoneFormat /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><TextFieldApp name="patientEmergencieContact" control={control} label="Contacto de Emergencia" phoneFormat /></Grid>
                    </Grid>
                </FormSection>

                <FormSection>
                    <SectionHeader>
                        <HomeIcon />
                        <Typography variant="h6">Dirección</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}><AutocompleteApp name="addressId" control={control} label="Dirección" options={patientDirectionOptions} /></Grid>
                    </Grid>
                </FormSection>

                <FormSection>
                    <SectionHeader>
                        <FavoriteIcon />
                        <Typography variant="h6">Información de Salud</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}><AutocompleteApp name="arsPlansId" control={control} label="Plan de ARS" options={arsPlanOptions} /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><AutocompleteApp name="bloodId" control={control} label="Tipo de Sangre" options={bloodOptions} /></Grid>
                        <Grid size={{ xs: 12 }}><TextFieldApp name="patientFirstRecord" control={control} label="Primer Registro del Paciente" multiline /></Grid>
                    </Grid>
                </FormSection>

                <FormSection>
                    <SectionHeader>
                        <MedicalInformationIcon />
                        <Typography variant="h6">Registros y Doctores</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}><AutocompleteApp name="medicRecordId" control={control} label="Registro Médico" options={medicRecordsOptions} /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><AutocompleteApp name="patientDoctorId" control={control} label="Doctor Asignado" options={doctorOptions} /></Grid>
                    </Grid>
                </FormSection>

                <FormSection>
                    <SectionHeader>
                        <EventNoteIcon />
                        <Typography variant="h6">Citas Médicas</Typography>
                    </SectionHeader>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}><AutocompleteApp name="dateMedicId" control={control} label="Cita Médica" options={dateMedicOptions} /></Grid>
                    </Grid>
                </FormSection>
            </Box>
        </form>
    );
}

export default PatientForm;