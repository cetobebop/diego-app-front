import type { AxiosInstance } from 'axios';


export class ApiService {

    constructor(public instance: AxiosInstance) {}

    setToken(token: string) {
        this.instance.defaults.headers.common['x_access_token'] = token;
    }

    getToken(): string | null {
        const token = this.instance.defaults.headers.common['x_access_token'];
        if (typeof token === 'string') {
            return token;
        }
        return null;
    }

}