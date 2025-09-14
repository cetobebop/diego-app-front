import type { ServerResponseError } from "./ServerResponseError.t";
import type { ServerResponseHistoryPatientSuccess } from "./ServerResponseHistoryPatient.t";


export interface IRepositoryApiHistoryPatient {
    getHistoryPatientById(id: string): Promise<ServerResponseHistoryPatientSuccess | ServerResponseError>;
    getHistoriesPatientsByPatientId(patientId: string): Promise<ServerResponseHistoryPatientSuccess | ServerResponseError[]>;
}