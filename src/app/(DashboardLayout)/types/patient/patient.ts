import { PatientDirection } from "./patientDIrection";

export interface Patient {
    PatientId: number;
    PatientName: string;
    PatientLastName?: string;
    PatientIdCard?: string;
    PatientPassport?: string;
    PatientBirthDate?: Date;
    PatientGender?: string;
    PatientEmail?: string;
    PatientPhone?: string;
    PatientDirection?: PatientDirection;
}


