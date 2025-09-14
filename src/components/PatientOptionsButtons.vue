
<template>

    <div class="row justify-center q-px-lg q-gutter-sm q-mb-md">
        <q-btn to="/patient/create" color="dark" style="min-width: 250px; max-width: 250px;" unelevated text-color="white" icon="add" label="Crear Paciente" class="q-py-lg q-px-sm text-weight-bold"></q-btn>
        <q-btn color="dark" :loading="loading" @click="getPatients" style="min-width: 250px; max-width: 250px;" unelevated text-color="dark" outline icon="view_list" label="Todos los Pacientes" class="q-py-lg q-px-sm text-weight-bold"></q-btn>
    </div>



</template>


<script setup lang="ts">
import { ApiPatientsRepository } from 'src/repository/Patients';
import { usePatientStore } from 'src/stores/PatientStore';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ref } from 'vue';


const api = ApiV1
const patientRepository = new ApiPatientsRepository(api)
const patientStore = usePatientStore()
const loading = ref<boolean>(false)

function getPatients(){
    patientRepository.getPatients({}).then(res => {
        loading.value = true
        patientStore.setPatients(res.patients)
        patientStore.setPatientsTotal(res.total)
    }).catch((error)=>{
        console.log('hubo un error el boton de obtener pacientes', error)
    }).finally(()=>{
        loading.value = false
    })
}

</script>