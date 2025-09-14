import type { ApiService } from "src/services/Api";
import type { IRepositoryApiAuth } from "src/interfaces/IRepositoryApiAuth.t";
import type { ServerResponseAuthSuccess, ServerResponseLogoutSuccess } from "src/interfaces/ServerResponseAuth.t";


export class ApiAuthRepository implements IRepositoryApiAuth {
    constructor(private api: ApiService) {}

    async login(username: string, password: string) {
        const {data} = await this.api.instance.post<ServerResponseAuthSuccess>('/auth/login', { username, password });
        this.api.setToken(data.token.value);
        return data;
    }

    async register(username: string, password: string) {
        const {data} = await this.api.instance.post<ServerResponseAuthSuccess >('/auth/register', { username, password });
    
        this.api.setToken(data.token.value);
        return data;
    }

    async refreshToken() {
       
        const {data} = await this.api.instance.post<ServerResponseAuthSuccess>('/auth/refresh_token');
        
        this.api.setToken(data.token.value);
        return data;
       
    }

    // refreshToken() {
       
    //     this.api.instance.post<ServerResponseAuthSuccess>('/auth/refresh_token').catch(res=>{
    //         console.log('error al refrescar token', res)
    //         throw new Error('Failed to refresh token');
    //     })
            
    //     return { token: '123', user: 'sdasda', status: 'SUCCESS' } as unknown as Promise<ServerResponseAuthSuccess>;
    // }

    async logout() {
        const {data} = await this.api.instance.get<ServerResponseLogoutSuccess>('/auth/logout');
        return data;
    }

}



