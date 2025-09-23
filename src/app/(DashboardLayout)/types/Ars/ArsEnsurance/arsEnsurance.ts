export interface ArsEnsurance {
    arsEnsuranceId?: number,
    ensuranceName: string,
    ensuranceDirection: string,
    ensurancePhone: string,
    ensurancePhone2: string,
    ensuranceFax: string,
    ensuranceEmail: string,
    ensuranceUpdateDate: Date,
    ensuranceSchedule: string,
    ensuranceRnc: string,
}

export interface ArsEnsurancePost {
    ensuranceName: string,
    ensuranceDirection: string,
    ensurancePhone: string,
    ensurancePhone2: string,
    ensuranceFax: string,
    ensuranceEmail: string,
    ensuranceUpdateDate: Date,
    ensuranceSchedule: string
}

export interface ArsEnsurancePut {
    arsEnsuranceId: number,
    ensuranceName: string,
    ensuranceDirection: string,
    ensurancePhone: string,
    ensurancePhone2: string,
    ensuranceFax: string,
    ensuranceEmail: string,
    ensuranceUpdateDate: Date,
    ensuranceSchedule: string
}

