"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useMainStore } from "@/app/store";

const DoctorAddressForm = () => {
    const { control } = useFormContext();
    const { sectorList } = useMainStore();

    const sectorOptions = sectorList.map(sector => ({
        id: sector.sectorId,
        name: sector.sectorName
    }));

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="doctorHouseNumber"
                    label="Número de Casa"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="doctorStreet"
                    label="Calle"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <AutocompleteApp
                    name="sectorId"
                    label="Sector"
                    options={sectorOptions}
                    control={control}
                />
            </Grid>
        </Grid>
    );
}
export default DoctorAddressForm;