import { Notify } from 'quasar';

export function showSuccessNotify(message: string) {
    Notify.create({
        type: 'positive',
        position: 'bottom-right',
        message: message
    });
}