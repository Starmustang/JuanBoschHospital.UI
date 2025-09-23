export interface MedicRecords {
    recordId: number,
    patientName: string,
    patientId: number,
    doctorId: number,
    followUpMedicRecord: string,
    signsMedicRecord: string
}

export interface MedicRecordsPost {
    patientId: number,
    doctorId: number,
    followUpMedicRecord: string,      
    signsMedicRecord: string
}

export interface MedicRecordsPut extends MedicRecordsPost {
    recordId: number;
}