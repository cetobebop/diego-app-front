import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import type { User } from 'src/interfaces/IUser';

export const useUserStore = defineStore('user', ()=>{

  const user = ref<User | null>(null);
  const isAuthenticated = ref(localStorage.getItem('sesion') !== null);

  function isLoggedIn(){
    isAuthenticated.value = !!localStorage.getItem('sesion');
    
    return isAuthenticated.value;
  };

  const setUser = (newUser: User) => {
    user.value = newUser;
    localStorage.setItem('sesion', 'true');
  };

  const clearUser = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('sesion');
  };

  return {
    user,
    isLoggedIn,
    setUser,
    clearUser
  };


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}