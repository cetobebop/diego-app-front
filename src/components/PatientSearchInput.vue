<template>

    <div class="patient-search-container" >
        <q-input outlined color="dark" autofocus placeholder="Buscar paciente..." @update:model-value="search" rounded v-model="text">
            <template v-slot:after>
                <q-btn round dense flat icon="info" @click="modal = true">
                    <q-tooltip class="bg-dark">
                        Información sobre la búsqueda de pacientes
                    </q-tooltip>
                </q-btn>
            </template>
            <template v-slot:prepend>
                <div v-if="loading">
                    <q-spinner
                        color="dark"
                        size="28px"
                    />
                </div>
                <q-avatar @click="searchPatients" v-if="!loading" class="cursor-pointer text-dark" font-size="28px" icon="search"></q-avatar>
            </template>
        </q-input>

        <patient-search-input-information-modal @update:hide="modal = false" :modal="modal"></patient-search-input-information-modal>
    </div>


</template>


<script setup lang="ts">
import PatientSearchInputInformationModal from './PatientSearchInputInformationModal.vue';
import { ref } from 'vue';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiPatientsRepository } from 'src/repository/Patients';
import { usePatientStore } from 'src/stores/PatientStore';
import { showErrorSimplyNotifyMessage } from 'src/utils/showNotifyError';

const text = ref('');
const loading = ref(false)
const modal = ref(false)
const patientStore = usePatientStore();
const patientsRepository = new ApiPatientsRepository(ApiV1);

let timeout: ReturnType<typeof setTimeout>;
function search() {
    clearTimeout(timeout);

    timeout = setTimeout(function () {
        searchPatients()
    }, 400);
   
}

function searchPatients() {
   if(!text.value) return 
   
   patientsRepository.searchPatients(text.value, {}).then((response) => {
        loading.value = true
        patientStore.setPatients(response.query.patients);
        patientStore.setPatientsTotal(response.query.count[0]?.total);
    }).catch((error) => {
        console.error('Error searching patients:', error);
        patientStore.setPatientsTotal(0);

        showErrorSimplyNotifyMessage("Error al buscar pacientes");
    }).finally(()=>{
        loading.value = false
    });
}

</script>

<style scoped>

.patient-search-container{
    width: 80%;
    margin: 0px auto;
    padding: 20px 0 20px 0;
    min-width: 270px;
}

</style>