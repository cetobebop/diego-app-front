import type { CreatePatientData } from "./IPatient.t";
import type { QueryParams } from "./QueryParams";
import type { ServerResponseDeletePatientSuccess, ServerResponseGetPatientsSuccess, ServerResponsePatientsSuccess, ServerResponseSearchPatientsSuccess } from "./ServerResponsePatients.t";


export interface IRepositoryApiPatient{
    createPatient(patient: CreatePatientData): Promise<ServerResponsePatientsSuccess>;
    getPatients(query: QueryParams): Promise<ServerResponseGetPatientsSuccess>;
    getPatientById(id: string): Promise<ServerResponsePatientsSuccess>;
    updatePatient(id: string, data: CreatePatientData): Promise<ServerResponsePatientsSuccess>;
    deletePatient(id: string): Promise<ServerResponseDeletePatientSuccess>;
    searchPatients(input: string, query: QueryParams): Promise<ServerResponseSearchPatientsSuccess>;
}