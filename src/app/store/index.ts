import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPatientSlice, PatientSlice } from "./patientSlice";
import { createCountrySlice, CountrySlice } from "./Address/Country/countrySlice";
import { createProvinceSlice, ProvinceSlice } from "./Address/Province/provinceSlice";
import { createMunicipalitySlice, MunicipalitySlice } from "./Address/municipality/municipalitySlice";
import { createSectorSlice, SectorSlice } from "./Address/sector/sectorSlice";
import { BloodSlice, createBloodSlice } from "./Blood/bloodSlice";
import { createArsEnsuranceSlice, ArsEnsuranceSlice } from "./Ars/ArsEnsurance/arsEnsuranceSlice";
import { createArsPlanSlice, ArsPlanSlice } from "./Ars/ArsPlan/arsPlanSlice";
import { createDateDoctorSlice, DateDoctorSlice } from "./Dates/DateDoctor/dateDoctorSlice";
import { createDateMedicSlice, DateMedicSlice } from "./Dates/DateMedic/dateMedicSlice";

export type MainStore = PatientSlice &
  CountrySlice &
  ProvinceSlice &
  MunicipalitySlice &
  BloodSlice &
  SectorSlice &
  ArsEnsuranceSlice &
  DateDoctorSlice &
  DateMedicSlice &
  ArsPlanSlice;

export const useMainStore = create(
  devtools<MainStore>(
    (set, get, store) => ({
      ...createPatientSlice(set, get, store),
      ...createCountrySlice(set, get, store),
      ...createProvinceSlice(set, get, store),
      ...createMunicipalitySlice(set, get, store),
      ...createSectorSlice(set, get, store),
      ...createBloodSlice(set, get, store),
      ...createDateDoctorSlice(set, get, store),
      ...createDateMedicSlice(set, get, store),
      ...createArsEnsuranceSlice(set, get, store),
      ...createArsPlanSlice(set, get, store),
    }),
    { name: "MainStore" }
  )
);
