export interface Blood {
    bloodId: number;
    bloodType: string;
    consentBlood: boolean;
}

export type BloodPost = Omit<Blood, 'bloodId'>;

export type BloodPut = Blood;