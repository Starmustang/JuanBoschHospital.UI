export interface DoctorEnsurance {
    doctorEnsuranceId?: number,
    doctorId: number,
    doctorName: string,
    arsEnsuranceId: number,
    ensuranceName: string,
    medicCode: string
}
export interface DoctorEnsurancePost {
    doctorId: number,
    arsEnsuranceId: number,
    medicCode: string
}

export interface DoctorEnsurancePut {
    doctorEnsuranceId: number,
    doctorId: number,
    arsEnsuranceId: number,
    medicCode: string
}