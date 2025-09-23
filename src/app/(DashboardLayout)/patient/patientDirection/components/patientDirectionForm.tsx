"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useMainStore } from "@/app/store";
import { useEffect } from "react";

const PatientDirectionForm = () => {
    const { control } = useFormContext();
    const { sectorList, getSectorList } = useMainStore();

    useEffect(() => {
        getSectorList();
    }, [getSectorList]);

    const sectorOptions = sectorList.map(sector => ({
        id: sector.sectorId,
        name: sector.sectorName
    }));

    return (
        <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="houseNumber"
                    label="Número de Casa"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp
                    name="houseStreet"
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
};

export default PatientDirectionForm;