export interface MedicEvaluations {
    medicEvaluationId: number,
    weightEva: number,
    presurreEva: number,
    breathingEva: number,
    heartRateEva: string,
    otherInfoEva: string,
    heightEva: string,
    previousSickNessEva: string
}

export interface MedicEvaluationsPost {
    weightEva: number,
    presurreEva: number,
    breathingEva: number,
    heartRateEva: string,
    otherInfoEva: string,
    heightEva: string,
    previousSickNessEva: string 
}

export type MedicEvaluationsPut = MedicEvaluations;