import { ApiAuthRepository } from "src/repository/Auth";
import { ApiV1 } from "src/utils/SingletonApiInstances";

const apiAuthRepository = new ApiAuthRepository(ApiV1);


export function login(username: string, password: string) {
    apiAuthRepository.login(username, password).then(response => {
        console.log('Login successful:', response);
    }).catch(error => {
        console.error('Login failed:', error);
    });
}

export function register(username: string, password: string) {
    apiAuthRepository.register(username, password).then(response => {
        console.log('Registration successful:', response);
    }).catch(error => {
        console.error('Registration failed:', error);
    });
}

export function refreshToken() {
  
    apiAuthRepository.refreshToken().then(response => {
        console.log('Token refreshed successfully:', response);
    }).catch(error => {
        console.error('Token refresh failed:', error);
    })

}

