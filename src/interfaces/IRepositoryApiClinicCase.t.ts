import type { CreateClinicCaseData } from "./IClinicCase.t";
import type { QueryParams } from "./QueryParams";
import type { ServerResponseClinicCaseSuccess, ServerResponseDeleteClinicCaseSuccess, ServerResponseGetClinicCaseSuccess } from "./ServerResponseClinicCases.t";



export interface IRepositoryApiClinicCase {
    createClinicCase(data: CreateClinicCaseData): Promise<ServerResponseClinicCaseSuccess>;
    getClinicCases(patientId: string, query: QueryParams): Promise<ServerResponseGetClinicCaseSuccess>
    getClinicCaseById(id: string): Promise<ServerResponseClinicCaseSuccess>;
    updateClinicCase(id: string, data: CreateClinicCaseData): Promise<ServerResponseClinicCaseSuccess>;
    deleteClinicCase(id: string): Promise<ServerResponseDeleteClinicCaseSuccess>;
}
