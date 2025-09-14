

export interface IPatientRaw {
    id: string
    name: string
    birthdate: string
    ci: string
    phoneNumber: number
    address: string
    age: number
    sex: 'masculino' | 'femenino'
    beginningDate: string
    userId: string
    clinicCasesId: string[]
    status: string
}



export type CreatePatientData = Omit<IPatientRaw, 'id' | 'userId' | 'clinicCasesId' | 'status'>;