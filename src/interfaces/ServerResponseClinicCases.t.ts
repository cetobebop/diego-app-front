import type { ResponseStatus } from "src/enum/EServerResponseStatus";
import type { IClinicCaseRaw } from "./IClinicCase.t";




export interface ServerResponseClinicCaseSuccess {
  status: ResponseStatus.SUCCESS;
  clinicCase: IClinicCaseRaw;
}

export interface ServerResponseGetClinicCaseSuccess {
  status: ResponseStatus.SUCCESS;
  clinicCases: IClinicCaseRaw[];
}

export interface ServerResponseDeleteClinicCaseSuccess {
  status: ResponseStatus.SUCCESS;
}
