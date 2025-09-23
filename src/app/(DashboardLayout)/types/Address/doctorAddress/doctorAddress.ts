export interface DoctorAddress {
    doctorAddressId: number,
    doctorHouseNumber: string,
    doctorStreet: string,
    sectorId: number,
    sectorName: string
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
