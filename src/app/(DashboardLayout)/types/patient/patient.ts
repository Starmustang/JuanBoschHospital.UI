import { PatientDirection } from "./patientDIrection";

export interface Patient {
    patientId?: number;
    patientName: string;
    patientLastName?: string;
    patientIdCard?: string;
    patientPassport?: string;
    patientBirthDate?: Date;
    patientGender?: string;
    patientEmail?: string;
    patientPhone?: string;
    arsPlansId?: number;
    arsPlansName?: string;
    addressId?: number;
    houseNumber?: string;
    houseStreet?: string;
    patientEmergencieContact?: string;
    patientFisRecord?: string;
    bloodId?: number;
    bloodType?: string;
    medicRecordId?: number;
    patientDirectionId?: number;
    patientDoctorId?: number;
    dateMedicId?: number;
}

export interface PatientPost {
    patientName: string,
    patientLastName: string,
    patientIdCard: string,
    patientPassport: string,
    patientBirthDate: string,
    patientGender: string,
    patientEmail: string,
    patientPhone: string,
    arsPlansId: number,
    addressId: number,
    patientEmergencieContact: string,
    patientFirstRecord: string,
    bloodId: number,
    medicRecordId: number,
    patientDirectionId: number,
    patientDoctorId: number,
    dateMedicId: number
}