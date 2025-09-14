import type { ResponseStatus } from "src/enum/EServerResponseStatus";


export interface ServerResponseError {
    status: ResponseStatus.FAILED;
    msg: string;
};