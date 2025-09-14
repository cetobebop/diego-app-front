
export interface IPatientSnapshot {
    id: string,
    name: string
    ci: string
    birthdate: string
    address: string,
    phoneNumber: number,
    age: number,
    updatedAt: string
} 

export interface IHistoryPatient {
    userId: string,
    id: string,
    patientId: string,
    changes: Partial<IPatientSnapshot>[]
} 