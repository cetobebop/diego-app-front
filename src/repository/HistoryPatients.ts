import type { IRepositoryApiHistoryPatient } from "src/interfaces/IRepositoryApiHistoryPatient.t";
import type { ServerResponseHistoryPatientSuccess } from "src/interfaces/ServerResponseHistoryPatient.t";
import type { ApiService } from "src/services/Api";


export class ApiHistoryPatientsRepository implements IRepositoryApiHistoryPatient {
    constructor(private api: ApiService) {}

    async getHistoriesPatientsByPatientId(patientId: string): Promise<ServerResponseHistoryPatientSuccess> {
        const {data} = await this.api.instance.get<ServerResponseHistoryPatientSuccess>(`/history_patients/history_patient_by_patient_id/${patientId}`);

        return data
    }

    async getHistoryPatientById(id: string): Promise<ServerResponseHistoryPatientSuccess> {
        const {data} = await this.api.instance.get<ServerResponseHistoryPatientSuccess>(`/history_patients/history_patient/${id}`);
        return data;
    }

}