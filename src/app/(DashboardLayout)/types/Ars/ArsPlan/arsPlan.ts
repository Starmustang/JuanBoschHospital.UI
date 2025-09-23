export interface ArsPlan {
    arsPlansId: number;
    afiliationNumberArs: string;
    arsPlansName: string;
    coveragePlanArs: string;
    internationalCoverage: boolean;
    isPlanActive: boolean;
    maxLimitArs: string;
    arsEnsuranceId: number;
    ensuranceName: string;
}

export interface ArsPlanPost {
    afiliationNumberArs: string,
    arsPlansName: string,
    coveragePlanArs: string,
    internationalCoverage: boolean,
    isPlanActive: boolean,
    maxLimitArs: string,
    arsEnsuranceId: number
}

export interface ArsPlanPut {
    arsPlansId: number,
    afiliationNumberArs: string,
    arsPlansName: string,
    coveragePlanArs: string,
    internationalCoverage: boolean,
    isPlanActive: boolean,
    maxLimitArs: string,
    arsEnsuranceId: number
}
