import type { ServerResponseAuthSuccess, ServerResponseLogoutSuccess } from "./ServerResponseAuth.t";

export interface IRepositoryApiAuth {
    login(username: string, password: string): Promise<ServerResponseAuthSuccess>;
    register(username: string, password: string): Promise<ServerResponseAuthSuccess>;
    refreshToken(): Promise<ServerResponseAuthSuccess>;
    logout(): Promise<ServerResponseLogoutSuccess>;
}



