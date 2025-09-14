import { AxiosError } from "axios";
import type { ServerResponseError } from "src/interfaces/ServerResponseError.t";




export class ErrorsHandlers {

    static handleAxiosError(error: AxiosError) {
        const data = error.response?.data as ServerResponseError
        const msg = data?.msg ? data?.msg : 'Error de conexion'
        return {
            msg
        }
    }

    static handleBasicError(error: Error){
        return {
            msg: error.message
        }
    }

    static handleError(error: unknown) {
        if(error instanceof AxiosError) return this.handleAxiosError(error)
        if(error instanceof Error) return this.handleBasicError(error)
        
        return {
            msg: 'Hubo un error'
        }
    }
}