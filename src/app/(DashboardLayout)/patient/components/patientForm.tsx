import { Grid2 as Grid } from "@mui/material";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useFormContext } from "react-hook-form";

const PatientForm = () => {
    const { control } = useFormContext();
    return (
        <form>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientName"
                        control={control}
                        label="Nombre"
                        placeholder="Ingrese el nombre"
                        autoFocus
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientLastName"
                        control={control}
                        label="Apellido"
                        placeholder="Ingrese el apellido"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientIdCard"
                        control={control}
                        label="Cedula"
                        placeholder="Ingrese la cedula"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientPassport"
                        control={control}
                        label="Pasaporte"
                        placeholder="Ingrese el pasaporte"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientBirthDate"
                        control={control}
                        label="Fecha de nacimiento"
                        placeholder="Ingrese la fecha de nacimiento"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientGender"
                        control={control}
                        label="Genero"
                        placeholder="Ingrese el genero"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientEmail"
                        control={control}
                        label="Email"
                        placeholder="Ingrese el email"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientPhone"
                        control={control}
                        label="Telefono"
                        placeholder="Ingrese el telefono"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientDirection.AddressId"
                        control={control}
                        label="Direccion"
                        placeholder="Ingrese la direccion"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientDirection.HomeNumber"
                        control={control}
                        label="Numero"
                        placeholder="Ingrese el numero"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldApp
                        name="PatientDirection.HouseStreet"
                        control={control}
                        label="Calle"
                        placeholder="Ingrese la calle"
                    />
                </Grid>
            </Grid>
        </form>
    );
}

export default PatientForm;