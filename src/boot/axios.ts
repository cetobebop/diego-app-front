// import axiosRetry from 'axios-retry';
import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ApiAuthRepository } from 'src/repository/Auth';
import { ApiService } from 'src/services/Api';
import { useUserStore } from 'src/stores/UserStore';
import { usePatientStore } from 'src/stores/PatientStore';
import { useClinicStore } from 'src/stores/ClinicCaseStore';

const api = axios.create({ baseURL: 'https://diego-api-y17c.onrender.com/api', withCredentials: true });
const apiService = new ApiService(api)
const authRepository = new ApiAuthRepository(apiService);

interface AxiosRC extends InternalAxiosRequestConfig {_retry?: boolean} 

api.interceptors.response.use(function (response) {
   
    return response;
  }, async function (error) {

    if(axios.isAxiosError(error)){
      const originalRequest: AxiosRC | undefined = error.config;


      // if(originalRequest && error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/refresh_token') ){
      //   console.log('Attempting to refresh token...');
      //   const {token} = await authRepository.refreshToken()
      //   console.log('Token refreshed:', token.value);
      //   originalRequest._retry = true;
      //   return api(originalRequest);
      // }

      

      if(originalRequest && error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/refresh_token')){
      
       
        originalRequest._retry = true
    

        try {
          console.log('Attempting to refresh token...');
          const {token} = await authRepository.refreshToken()
          originalRequest.headers["x_access_token"] = token.value
          console.log('pasoooo')
          return api(originalRequest); 

        } catch (refreshError) {
          
          console.error('Token refresh failed:', refreshError);
          authRepository.logout().then((res)=>{
            console.log('Logout successful: ', res.status);
            useUserStore().clearUser();
            useClinicStore().clearClinicCases();
            usePatientStore().clearPatients();
            location.reload()
          }).catch(()=>{
            console.error('Logout failed:', refreshError);
          })
          console.log('pasoooo')

          return Promise.reject(refreshError as Error);
        }
          
        
      }
    
    }
    return Promise.reject(error as Error);
});



// axiosRetry(api, {
//   retries: 1,
//   retryDelay:(retryCount) => {
//     return Math.pow(2, retryCount) * 1000; 
//   },
//   retryCondition(error) {
//     if (error.response?.status === 401) {
//       return true;
//     }

//     return false;
//   }
// });


export { api };
