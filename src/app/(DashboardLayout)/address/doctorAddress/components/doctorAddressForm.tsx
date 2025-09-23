"use client";
import { Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AutocompleteApp from "@/app/components/autocomplete/autocompleteApp";
import TextFieldApp from "@/app/components/textfieldApp/textfieldApp";
import { useMainStore } from "@/app/store";

const DoctorAddressForm = () => {
    const { control, watch, setValue } = useFormContext();
    const { countryList, provinceList, municipalityList, sectorList } = useMainStore();

    const selectedCountry = watch('countryId');
    const selectedProvince = watch('provinceId');
    const selectedMunicipality = watch('municipalityId');

    const countryOptions = countryList.map(c => ({ id: c.countryId || 0, name: c.countryName }));
    const provinceOptions = provinceList.filter(p => p.countryId === selectedCountry).map(p => ({ id: p.provinceId || 0, name: p.provinceName }));
    const municipalityOptions = municipalityList.filter(m => m.provinceId === selectedProvince).map(m => ({ id: m.municipalityId || 0, name: m.municipalityName || '' }));
    const sectorOptions = sectorList.filter(s => s.municipalityId === selectedMunicipality).map(s => ({ id: s.sectorId || 0, name: s.sectorName }));

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp name="doctorHouseNumber" label="Número de Casa" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldApp name="doctorStreet" label="Calle" control={control} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="countryId"
                    label="País"
                    options={countryOptions}
                    control={control}
                    onChangeCallback={() => {
                        setValue('provinceId', 0);
                        setValue('municipalityId', 0);
                        setValue('sectorId', 0);
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="provinceId"
                    label="Provincia"
                    options={provinceOptions}
                    control={control}
                    disabled={!selectedCountry}
                    onChangeCallback={() => {
                        setValue('municipalityId', 0);
                        setValue('sectorId', 0);
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="municipalityId"
                    label="Municipio"
                    options={municipalityOptions}
                    control={control}
                    disabled={!selectedProvince}
                    onChangeCallback={() => {
                        setValue('sectorId', 0);
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteApp
                    name="sectorId"
                    label="Sector"
                    options={sectorOptions}
                    control={control}
                    disabled={!selectedMunicipality}
                />
            </Grid>
        </Grid>
    );
}

export default DoctorAddressForm;