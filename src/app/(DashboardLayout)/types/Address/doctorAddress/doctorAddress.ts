export interface DoctorAddress {
    doctorAddressId: number,
    doctorHouseNumber: string,
    doctorStreet: string,
    sectorId: number,
    sectorName: string,
    countryId?: number,
    provinceId?: number,
    municipalityId?: number
}

export interface DoctorAddressPost {
    doctorHouseNumber: string,
    doctorStreet: string,
    sectorId: number
}

export interface DoctorAddressPut {
    doctorAddressId: number,
    doctorHouseNumber: string,
    doctorStreet: string,
    sectorId: number
}
