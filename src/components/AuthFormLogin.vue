<template>
    <div class="auth-form-login">
        
        <h1 id="auth-form-title">Fisium</h1>
        <span id="auth-form-subtitle">Aplicación de fisioterapia para almacenar pacientes y sus historias clínicas.</span>
        <q-form @submit.prevent="handleSubmit">
            <div class="column q-gutter-sm">

                <div >
                    <q-input outlined :rules="authInputRules().username" color="dark" v-model="username" label="Nombre de usuario:" />
                </div>
                <div style="margin-top: 10px;">
                    <q-input outlined :type="isPwd ? 'password' : 'text'" color="dark" v-model="password" label="Contraseña:" :rules="authInputRules().password">
                    <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>


                </div>
                <q-btn  type="submit" unelevated  style="margin-top:10px; background: #000; color: white; padding: 16px 10px; font-weight: 700;" :loading="loading" label="Iniciar Sesión" />
            </div>
            
        </q-form>
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiAuthRepository } from 'src/repository/Auth';
import { showErrorSimplyNotify } from 'src/utils/showNotifyError';
import { showSuccessNotify } from 'src/utils/showNotifySuccess';
import { authInputRules } from 'src/utils/inputRules';
import { useUserStore } from 'src/stores/UserStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const loading = ref<boolean>(false);
const isPwd = ref<boolean>(true)
const authRepository = new ApiAuthRepository(ApiV1);
const handleSubmit = () => {
    loading.value = true;
    authRepository.login(username.value, password.value)
        .then(async response => {
            userStore.setUser(response.user);
            showSuccessNotify('Usuario logueado correctamente');
          
            await router.push('/')
           
        })
        .catch(error => {
            showErrorSimplyNotify(error);
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>

<style scoped>  
    .auth-form-login{
        width: 400px;
        margin: 0 auto;
        margin-top: 40px;
        height: 400px;
        min-width: 200px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 30px 15px 20px 15px;
        display: flex;
        flex-direction: column; 
        justify-content: flex-start;
    }


    #auth-form-title{
        text-align: center;
        font-size: 1em;
        font-weight: 700;
        margin: 0 ;
        line-height: 1em; 
        height: fit-content;
        color: #000
    }

    #auth-form-subtitle{
        text-align: left;
        font-size: 0.8em;
        font-weight: 400;
        margin: 10px 0;
        height: fit-content;
        color: #000
    }
 

    @media (900px > width ) {
        .auth-form-register{
            width: 350px;
            height: 300px;
        }

        #auth-form-title{
            font-size: 1.5em;

        }
    }

    @media (500px > width ) {
        .auth-form-register{
            width: 300px;
        }
    }

    /* @media (300px > width ) {
        .auth-form-register{
            width: 200px;
        }
    } */
</style>