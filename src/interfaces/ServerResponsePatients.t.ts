import type { ResponseStatus } from "src/enum/EServerResponseStatus";
import type { IPatientRaw } from "./IPatient.t";


export interface ServerResponsePatientsSuccess {
    status: ResponseStatus.SUCCESS
    patient: IPatientRaw;
}

export interface ServerResponseGetPatientsSuccess {
    status: ResponseStatus.SUCCESS
    patients: IPatientRaw[];
    total: number;
}

export interface ServerResponseDeletePatientSuccess {
    status: ResponseStatus.SUCCESS
}

export interface ServerResponseSearchPatientsSuccess {
    status: ResponseStatus.SUCCESS
    query:{
        patients: IPatientRaw[];
        count: [{ total: number }];
    }
}