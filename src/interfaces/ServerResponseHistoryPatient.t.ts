
import type { ResponseStatus } from 'src/enum/EServerResponseStatus';
import type { IHistoryPatient } from './IHistoryPatient.t';

export interface ServerResponseHistoryPatientSuccess {
    status: ResponseStatus.SUCCESS;
    histPat: IHistoryPatient;
}

