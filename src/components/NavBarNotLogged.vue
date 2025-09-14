<template>
    <div>
         <q-btn-dropdown color="dark" label="ingreso">
            <q-list>
                <q-item clickable v-close-popup @click="onLogin">
                <q-item-section>
                    <q-item-label>Iniciar Sesión</q-item-label>
                </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="onRegister">
                <q-item-section>
                    <q-item-label>Registrarse</q-item-label>
                </q-item-section>
                </q-item>
                
            </q-list>
        </q-btn-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter()

function onLogin() {
  router.push({ name: 'login' }).then(()=>{}).catch(()=>{});
}

function onRegister() {
  router.push({ name: 'register' }).then(()=>{}).catch(()=>{});
}


</script>