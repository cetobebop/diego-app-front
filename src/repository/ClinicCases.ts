import type { ServerResponseClinicCaseSuccess, ServerResponseDeleteClinicCaseSuccess, ServerResponseGetClinicCaseSuccess } from "src/interfaces/ServerResponseClinicCases.t";
import type { CreateClinicCaseData, UpdateClinicCase } from "src/interfaces/IClinicCase.t";
import type { IRepositoryApiClinicCase } from "src/interfaces/IRepositoryApiClinicCase.t";
import type { QueryParams } from "src/interfaces/QueryParams";
import type { ApiService } from "src/services/Api";


export class ApiClinicCasesRepository implements IRepositoryApiClinicCase {

    constructor(private api: ApiService) {}

    async createClinicCase(clinicCase: CreateClinicCaseData): Promise<ServerResponseClinicCaseSuccess> {
        const formData = new FormData()
        formData.append('caseNumber', clinicCase.caseNumber);
        formData.append('title', clinicCase.title);
        formData.append('beginningDate', clinicCase.beginningDate);
        formData.append('patientId', clinicCase.patientId);
        formData.append('pdf', clinicCase.pdf);

        const {data} = await this.api.instance.post<ServerResponseClinicCaseSuccess>('/clinic_cases/clinic_case', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    }

    async getClinicCases(patientId: string,query: QueryParams): Promise<ServerResponseGetClinicCaseSuccess> {
        const {data} = await this.api.instance.post<ServerResponseGetClinicCaseSuccess>('/clinic_cases/clinic_case_by_patient_id',{patientId}, { params: query });
        return data;
    }

    async getClinicCaseById(id: string): Promise<ServerResponseClinicCaseSuccess> {
        const {data} = await this.api.instance.get<ServerResponseClinicCaseSuccess>(`/clinic_cases/clinic_case/${id}`);
        return data;
    }

    async updateClinicCase(id: string, partialClinicCase: UpdateClinicCase): Promise<ServerResponseClinicCaseSuccess> {
        const formData = new FormData()
        formData.append('caseNumber', partialClinicCase.caseNumber);
        formData.append('title', partialClinicCase.title);
        formData.append('beginningDate', partialClinicCase.beginningDate);
        if(partialClinicCase.pdf) {
            formData.append('pdf', partialClinicCase.pdf);
        }
        const {data} = await this.api.instance.patch<ServerResponseClinicCaseSuccess>(`/clinic_cases/clinic_case/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    }

    async deleteClinicCase(id: string): Promise<ServerResponseDeleteClinicCaseSuccess> {
        const {data} = await this.api.instance.delete<ServerResponseDeleteClinicCaseSuccess>(`/clinic_cases/clinic_case/${id}`);
        return data;
    }
}