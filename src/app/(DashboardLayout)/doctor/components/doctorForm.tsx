"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useMainStore } from "@/app/store";

const DoctorForm = () => {
    const { control } = useFormContext();
    const { doctorAddressList } = useMainStore();

    const addressOptions = doctorAddressList.map(address => ({
        id: address.doctorAddressId,
        name: `${address.doctorStreet}, ${address.doctorHouseNumber}`
    }));

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp name="doctorName" label="Nombre" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp name="doctorLastName" label="Apellido" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp name="doctorPhone" label="Teléfono" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp name="doctorEmail" label="Email" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp name="doctorIdCard" label="Cédula" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp name="doctorPassport" label="Pasaporte" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp name="doctorSpeciality" label="Especialidad" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextFieldApp name="doctorExecatur" label="Execatur" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <AutocompleteApp
                    name="doctorAddressId"
                    label="Dirección"
                    options={addressOptions}
                    control={control}
                />
            </Grid>
        </Grid>
    );
}
export default DoctorForm;