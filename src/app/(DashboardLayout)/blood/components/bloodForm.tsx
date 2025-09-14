import CheckBoxApp from "@/app/components/checkbox/checkboxApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { Grid2 as Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const BloodForm = () => {
    const {control} = useForm();
    return (
       <Grid container spacing={2}>
        <Grid size={{xs: 12, md: 6}}>
            <TextFieldApp
            label="Nombre"
            name="bloodName"
            type="text"
            fullWidth
            control={control}
            />
        </Grid>
        <Grid size={{xs: 12, md: 6}}>
            <CheckBoxApp
            control={control}
            name="bloodActive"
            label="Activo"
            />
        </Grid>
       </Grid>
    );
}
export default BloodForm;