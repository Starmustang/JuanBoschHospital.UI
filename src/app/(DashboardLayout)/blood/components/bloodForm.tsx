import CheckBoxApp from "@/app/components/checkbox/checkboxApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";

const BloodForm = () => {
    const { control } = useFormContext();
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    label="Tipo de Sangre"
                    name="bloodType"
                    type="text"
                    fullWidth
                    control={control}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <CheckBoxApp
                    control={control}
                    name="consentBlood"
                    label="Consentimiento"
                />
            </Grid>
        </Grid>
    );
}
export default BloodForm;