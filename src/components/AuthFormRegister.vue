<template>
    <div class="auth-form-register">
        <h1 id="auth-form-title">Registrarse</h1>
        <q-form @submit.prevent="handleSubmit">
            <div class="column q-gutter-sm">
                <div>
                    <q-input standout="bg-dark text-white" :rules="authInputRules().username" v-model="username" label="Nombre de usuario:" />
                </div>
                <div style="margin-top: 10px;">
                    <q-input standout="bg-dark text-white" :type="isPwd ? 'password' : 'text'" v-model="password" label="Contraseña:" :rules="authInputRules().password">
                         <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>
                </div>
                <q-btn :loading="loading" type="submit"  style="margin-top:10px; background: #000; color: white; padding: 16px 10px; font-weight: 700;" label="Enviar" />
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

const username = ref('');
const password = ref('');
const isPwd = ref<boolean>(true)
const loading = ref(false);
const router = useRouter();
const userStore = useUserStore();

const authRepository = new ApiAuthRepository(ApiV1);
const handleSubmit = () => {
    loading.value = true;
    authRepository.register(username.value, password.value)
        .then(async response => {
            userStore.setUser(response.user);
            showSuccessNotify('Usuario registrado correctamente');
            await router.push('/');
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
    .auth-form-register{
        width: 400px;
        margin: 0 auto;
        margin-top: 40px;
        height: 450px;
        min-width: 200px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 0 10px 20px 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }


    #auth-form-title{
        text-align: center;
        font-size: 3em;
        margin: 0;
        color: rgba(0, 0, 0, 0.5)

    }
 

    @media (900px > width ) {
        .auth-form-register{
            width: 350px;
        }

        #auth-form-title{
            font-size: 2.5em;

        }
    }

    @media (500px > width ) {
        .auth-form-register{
            width: 250px;
        }
    }

    @media (300px > width ) {
        .auth-form-register{
            width: 200px;
        }
    }
</style>