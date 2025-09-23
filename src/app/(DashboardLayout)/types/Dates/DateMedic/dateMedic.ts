export interface DateMedic
{
    dateMedicId: number,
    patientId: number, 
    patientName: string,
    doctorId: number,
    doctorName: string,
    dateMedicDate: Date,
    hospitalMedicDate: Date,
    consultationTypeId: number,
    dateDoctorId: number
}

export interface DateMedicPost {
    patientId: number,
    doctorId: number,
    dateMedicDate: Date,
    hospitalMedicDate: Date,
    consultationTypeId: number,
    dateDoctorId: number
}

export interface DateMedicPut {
    dateMedicId: number,
    patientId: number,
    doctorId: number,
    dateMedicDate: Date,
    hospitalMedicDate: Date,
    consultationTypeId: number,
    dateDoctorId: number
}
