import type { ServerResponseDeletePatientSuccess, ServerResponseGetPatientsSuccess, ServerResponsePatientsSuccess, ServerResponseSearchPatientsSuccess } from "src/interfaces/ServerResponsePatients.t";
import type { CreatePatientData } from "src/interfaces/IPatient.t";
import type { IRepositoryApiPatient } from "src/interfaces/IRepositoryApiPatient";
import type { QueryParams } from "src/interfaces/QueryParams";
import type { ApiService } from "src/services/Api";


export class ApiPatientsRepository implements IRepositoryApiPatient {
    constructor(private api: ApiService) {}

    async createPatient(patient: CreatePatientData): Promise<ServerResponsePatientsSuccess> {
        const {data} = await this.api.instance.post<ServerResponsePatientsSuccess>('/patients/patient', patient);

        return data;
    }

    async getPatients(query: QueryParams): Promise<ServerResponseGetPatientsSuccess> {
        const {data} = await this.api.instance.get<ServerResponseGetPatientsSuccess>('/patients/patient', {params: query});
        return data;
    }

    async getPatientById(id: string): Promise<ServerResponsePatientsSuccess> {
        const {data} = await this.api.instance.get<ServerResponsePatientsSuccess>(`/patients/patient/${id}`);
        return data;
    }

    async updatePatient(id: string, partialPatient: CreatePatientData): Promise<ServerResponsePatientsSuccess> {
        const {data} = await this.api.instance.patch<ServerResponsePatientsSuccess>(`/patients/patient/${id}`, partialPatient);
        return data;
    }

    async deletePatient(id: string): Promise<ServerResponseDeletePatientSuccess> {
        const {data} = await this.api.instance.delete<ServerResponseDeletePatientSuccess>(`/patients/patient/${id}`);
        return data;
    }

    async searchPatients(input: string, query: QueryParams): Promise<ServerResponseSearchPatientsSuccess> {
        const {data} = await this.api.instance.post<ServerResponseSearchPatientsSuccess>(`/patients/patient_search`, {text: input}, {params: query});
        return data;
    }
}