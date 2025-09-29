import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPatientSlice, PatientSlice } from "./patient/patientSlice";
import { createCountrySlice, CountrySlice } from "./Address/Country/countrySlice";
import { createProvinceSlice, ProvinceSlice } from "./Address/Province/provinceSlice";
import { createMunicipalitySlice, MunicipalitySlice } from "./Address/municipality/municipalitySlice";
import { createSectorSlice, SectorSlice } from "./Address/sector/sectorSlice";
import { BloodSlice, createBloodSlice } from "./Blood/bloodSlice";
import { createArsEnsuranceSlice, ArsEnsuranceSlice } from "./Ars/ArsEnsurance/arsEnsuranceSlice";
import { createArsPlanSlice, ArsPlanSlice } from "./Ars/ArsPlan/arsPlanSlice";
import { createDateDoctorSlice, DateDoctorSlice } from "./Dates/DateDoctor/dateDoctorSlice";
import { createDateMedicSlice, DateMedicSlice } from "./Dates/DateMedic/dateMedicSlice";
import { createDoctorAddressSlice, DoctorAddressSlice } from "./Address/doctorAddress/doctorAddressSlice";
import { createDoctorSlice, DoctorSlice } from "./Doctor/doctorSlice";
import { createDoctorEnsuranceSlice, DoctorEnsuranceSlice } from "./Doctor/doctorEnsuranceSlice";
import { createMedicRecordsSlice, MedicRecordsSlice } from "./Medic/medicRecordsSlice";
import { createMedicEvaluationSlice, MedicEvaluationSlice } from "./Medic/medicEvaluationSlice";
import { createPatientDirectionSlice, PatientDirectionSlice } from "./patient/patientDirectionSlice";
import { createAuthSlice, AuthSlice } from "./Auth/authSlice";
import { createRegisterSlice, RegisterSlice } from "./Auth/registerSlice";
import { createUserSlice, UserSlice } from "./Users/userSlice";

export type MainStore = PatientSlice &
  CountrySlice &
  ProvinceSlice &
  MunicipalitySlice &
  BloodSlice &
  SectorSlice &
  ArsEnsuranceSlice &
  DateDoctorSlice &
  DateMedicSlice &
  DoctorAddressSlice &
  DoctorEnsuranceSlice &
  DoctorSlice &
  MedicRecordsSlice &
  MedicEvaluationSlice &
  PatientDirectionSlice &
  ArsPlanSlice &
  AuthSlice &
  RegisterSlice &
  UserSlice;

export const useMainStore = create(
  devtools<MainStore>(
    (set, get, store) => ({
      ...createPatientSlice(set, get, store),
      ...createCountrySlice(set, get, store),
      ...createProvinceSlice(set, get, store),
      ...createSectorSlice(set, get, store),
      ...createBloodSlice(set, get, store),
      ...createDateDoctorSlice(set, get, store),
      ...createDateMedicSlice(set, get, store),
      ...createDoctorAddressSlice(set, get, store),
      ...createDoctorSlice(set, get, store),
      ...createMedicRecordsSlice(set, get, store),
      ...createMedicEvaluationSlice(set, get, store),
      ...createArsEnsuranceSlice(set, get, store),
      ...createArsPlanSlice(set, get, store),
      ...createDoctorEnsuranceSlice(set, get, store),
      ...createPatientDirectionSlice(set, get, store),
      ...createMunicipalitySlice(set, get, store),
      ...createAuthSlice(set, get, store),
      ...createRegisterSlice(set, get, store),
      ...createUserSlice(set, get, store),
    }),
    { name: "MainStore" }
  )
);
