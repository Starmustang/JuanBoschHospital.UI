import { PatientDirection } from "./patientDIrection";

export interface Patient {
    
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

export interface PatientUpdate extends Patient {
    PatientId?: number;
}




