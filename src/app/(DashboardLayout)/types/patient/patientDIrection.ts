export interface PatientDirection {
    addressId: number,
    houseNumber: string,
    houseStreet: string,
    sectorId: number,
    sectorName: string,
    municipalityName: string,
    provinceName: string,
    countryName: string    
}

export interface PatientDirectionPost {
    houseNumber: string,
    houseStreet: string,
    sectorId: number
}

export interface PatientDirectionPut {
    addressId: number,
    houseNumber: string,
    houseStreet: string,
    sectorId: number
}

