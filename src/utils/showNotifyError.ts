import { ErrorsHandlers } from "src/Errors/ErrorsHandlers";
import { Notify } from 'quasar'


export function showErrorSimplyNotify(error: unknown) {
    const {msg} = ErrorsHandlers.handleError(error)

    Notify.create({
        type: 'negative',
        position: 'bottom-right',
        message: msg
    })
}

export function showErrorSimplyNotifyMessage(msg: string) {

    Notify.create({
        type: 'negative',
        position: 'bottom-right',
        message: msg
    })
}