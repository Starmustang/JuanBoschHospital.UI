import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";

import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import { useMainStore } from "@/app/store";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";

const SectorForm = () => {
    const { control } = useFormContext();
    const { municipalityList } = useMainStore();
    return (
        <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 12}}>
                <TextFieldApp
                label="Nombre"
                name="sectorName"
                type="text"
                fullWidth
                control={control}
                />
            </Grid>
            <Grid size={{xs: 12, md: 12}}>
               <AutocompleteApp
               label="Municipio"
               name="municipalityId"               
               control={control}
               options={municipalityList.map((municipality) => ({
                                      id: municipality.municipalityId || 0,
                   name: municipality.municipalityName || ''
               }))}
               />
            </Grid>
        </Grid>
    );
}
export default SectorForm;