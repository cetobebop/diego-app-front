<template>

    <q-btn unelevated color="dark" icon="logout" size="xs" @click="onLogout"></q-btn>


</template>

<script setup lang="ts">
import { ApiAuthRepository } from 'src/repository/Auth';
import { useClinicStore } from 'src/stores/ClinicCaseStore';
import { usePatientStore } from 'src/stores/PatientStore';
import { useUserStore } from 'src/stores/UserStore';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { useRouter } from 'vue-router';

const router = useRouter();
const authRepository = new ApiAuthRepository(ApiV1);
const userStore = useUserStore();
const clinicStore = useClinicStore();
const patientStore = usePatientStore();

function onLogout() {
    authRepository.logout().then(async () => {
        userStore.clearUser();
        clinicStore.clearClinicCases();
        patientStore.clearPatients();
        await router.push({ name: 'login' });
    }).catch(() => { });
}

</script>